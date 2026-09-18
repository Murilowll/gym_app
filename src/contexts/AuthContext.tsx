import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { getUserProfile, saveUserProfile } from '../services/firestoreService';
import type { UserProfile, UserRole } from '../types/user';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, displayName: string, role: UserRole) => Promise<void>;
  signInWithGoogle: (roleIfNew?: UserRole) => Promise<void>;
  signOutUser: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  switchRole: (newRole: UserRole) => Promise<void>;
  updateUserProfileData: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = async (firebaseUser: User) => {
    try {
      let userProfile = await getUserProfile(firebaseUser.uid);
      if (!userProfile) {
        // Cria perfil inicial caso não exista (ex: login com Google pela primeira vez)
        userProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || 'Atleta IronPulse',
          photoURL: firebaseUser.photoURL || null,
          role: 'student',
          createdAt: new Date().toISOString()
        };
        await saveUserProfile(userProfile);
      }
      if (userProfile) {
        setProfile(userProfile);
      }
    } catch (err) {
      console.warn('Aviso ao sincronizar perfil do Firestore:', err);
    }
  };

  useEffect(() => {
    // Garante que o loading nunca fique preso por mais de 1.5s
    const safetyTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Define perfil imediato para não bloquear a interface
        const immediateProfile: UserProfile = {
          uid: currentUser.uid,
          email: currentUser.email || '',
          displayName:
            currentUser.displayName ||
            (currentUser.email?.toLowerCase().includes('murilolemoslopes')
              ? 'Murilo Lopes'
              : 'Atleta IronPulse'),
          photoURL: currentUser.photoURL || null,
          role: 'student',
          createdAt: new Date().toISOString()
        };
        setProfile(immediateProfile);
        setLoading(false);

        // Busca dados adicionais do Firestore em segundo plano
        fetchProfile(currentUser).catch(() => {});
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      clearTimeout(safetyTimer);
      unsubscribe();
    };
  }, []);

  const signInWithEmail = async (email: string, pass: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    setUser(cred.user);
    const immediateProfile: UserProfile = {
      uid: cred.user.uid,
      email: cred.user.email || '',
      displayName:
        cred.user.displayName ||
        (cred.user.email?.toLowerCase().includes('murilolemoslopes')
          ? 'Murilo Lopes'
          : 'Atleta IronPulse'),
      photoURL: cred.user.photoURL || null,
      role: 'student',
      createdAt: new Date().toISOString()
    };
    setProfile(immediateProfile);
    setLoading(false);
    fetchProfile(cred.user).catch(() => {});
  };

  const signUpWithEmail = async (
    email: string,
    pass: string,
    displayName: string,
    role: UserRole
  ) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    if (cred.user) {
      updateFirebaseProfile(cred.user, { displayName }).catch(() => {});
      const newProfile: UserProfile = {
        uid: cred.user.uid,
        email,
        displayName,
        role,
        createdAt: new Date().toISOString()
      };
      setProfile(newProfile);
      setUser(cred.user);
      setLoading(false);
      saveUserProfile(newProfile).catch(() => {});
    }
  };

  const signInWithGoogle = async (roleIfNew: UserRole = 'student') => {
    const cred = await signInWithPopup(auth, googleProvider);
    if (cred.user) {
      let existingProfile = await getUserProfile(cred.user.uid);
      if (!existingProfile) {
        existingProfile = {
          uid: cred.user.uid,
          email: cred.user.email || '',
          displayName: cred.user.displayName || 'Atleta IronPulse',
          photoURL: cred.user.photoURL || null,
          role: roleIfNew,
          createdAt: new Date().toISOString()
        };
        await saveUserProfile(existingProfile);
      }
      setProfile(existingProfile);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
    setProfile(null);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user);
    }
  };

  const switchRole = async (newRole: UserRole) => {
    if (profile && user) {
      const updated = { ...profile, role: newRole };
      await saveUserProfile(updated);
      setProfile(updated);
    }
  };

  const updateUserProfileData = async (updates: Partial<UserProfile>) => {
    if (user) {
      const current = profile || {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Atleta',
        role: 'student' as UserRole,
        createdAt: new Date().toISOString()
      };
      const updated: UserProfile = { ...current, ...updates };

      if (updates.displayName || updates.photoURL) {
        try {
          await updateFirebaseProfile(user, {
            displayName: updates.displayName || user.displayName,
            photoURL: updates.photoURL || user.photoURL
          });
        } catch (e) {
          console.warn('Erro ao atualizar dados no Firebase Auth:', e);
        }
      }

      await saveUserProfile(updated);
      setProfile(updated);
    } else if (profile) {
      // Visitante local
      setProfile({ ...profile, ...updates });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOutUser,
        resetPassword,
        refreshProfile,
        switchRole,
        updateUserProfileData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};
