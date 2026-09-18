import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where
} from 'firebase/firestore';
import { db } from './firebase';
import type { UserProfile } from '../types/user';
import type { UserStats, CompletedWorkoutRecord, SetLog } from '../types/workout';

async function withTimeout<T>(promise: Promise<T>, ms = 2500): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<T>((_, reject) => {
    timer = setTimeout(() => reject(new Error('Firestore operation timed out')), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

// 1. Perfil do Usuário
export async function saveUserProfile(profile: UserProfile): Promise<void> {
  try {
    const userRef = doc(db, 'users', profile.uid);
    await withTimeout(setDoc(userRef, profile, { merge: true }));
  } catch (err) {
    console.warn('Aviso ao salvar perfil no Firestore (offline/modo local ativo):', err);
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await withTimeout(getDoc(userRef));
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
  } catch (error) {
    console.warn('Aviso ao carregar perfil do Firestore (offline/modo local ativo):', error);
  }
  return null;
}

// 2. Estatísticas do Usuário (Streak, Total de Treinos, Histórico de Cargas)
export async function loadCloudUserStats(uid: string): Promise<UserStats | null> {
  try {
    const statsRef = doc(db, 'users', uid, 'data', 'stats');
    const snap = await withTimeout(getDoc(statsRef));
    if (snap.exists()) {
      return snap.data() as UserStats;
    }
  } catch (error) {
    console.warn('Aviso ao carregar stats do Firestore:', error);
  }
  return null;
}

export async function saveCloudUserStats(uid: string, stats: UserStats): Promise<void> {
  try {
    const statsRef = doc(db, 'users', uid, 'data', 'stats');
    await withTimeout(setDoc(statsRef, stats, { merge: true }));
  } catch (error) {
    console.warn('Aviso ao salvar stats no Firestore:', error);
  }
}

// 3. Histórico de Treinos Concluídos
export async function loadCloudWorkoutHistory(uid: string): Promise<CompletedWorkoutRecord[]> {
  try {
    const historyCol = collection(db, 'users', uid, 'history');
    const q = query(historyCol, orderBy('date', 'desc'), limit(50));
    const snap = await withTimeout(getDocs(q));
    const records: CompletedWorkoutRecord[] = [];
    snap.forEach((doc) => {
      records.push(doc.data() as CompletedWorkoutRecord);
    });
    return records;
  } catch (error) {
    console.warn('Aviso ao carregar histórico do Firestore:', error);
    return [];
  }
}

export async function saveCloudCompletedWorkout(
  uid: string,
  record: CompletedWorkoutRecord
): Promise<void> {
  try {
    const workoutDoc = doc(db, 'users', uid, 'history', record.id);
    await withTimeout(setDoc(workoutDoc, record));
  } catch (error) {
    console.warn('Aviso ao salvar treino concluído no Firestore:', error);
  }
}

// 4. Séries e Cargas Ativas do Treino
export async function loadCloudActiveSets(
  uid: string
): Promise<{ [exerciseId: string]: SetLog[] }> {
  try {
    const setsDoc = doc(db, 'users', uid, 'data', 'activeSets');
    const snap = await withTimeout(getDoc(setsDoc));
    if (snap.exists()) {
      return snap.data() as { [exerciseId: string]: SetLog[] };
    }
  } catch (error) {
    console.warn('Aviso ao carregar séries ativas do Firestore:', error);
  }
  return {};
}

export async function saveCloudActiveSets(
  uid: string,
  activeSets: { [exerciseId: string]: SetLog[] }
): Promise<void> {
  try {
    const setsDoc = doc(db, 'users', uid, 'data', 'activeSets');
    await withTimeout(setDoc(setsDoc, activeSets));
  } catch (error) {
    console.warn('Aviso ao salvar séries ativas no Firestore:', error);
  }
}

// 5. Consulta para o Painel do Treinador/Personal
export interface StudentSummary {
  profile: UserProfile;
  stats?: UserStats;
  recentWorkouts?: CompletedWorkoutRecord[];
}

export async function getTrainerStudents(trainerUid?: string): Promise<StudentSummary[]> {
  try {
    const usersCol = collection(db, 'users');
    let q = query(usersCol, where('role', '==', 'student'));

    if (trainerUid) {
      // Se tiver personal vinculado
      q = query(usersCol, where('role', '==', 'student'), where('assignedTrainerId', '==', trainerUid));
    }

    const snap = await getDocs(q);
    const students: StudentSummary[] = [];

    for (const docSnap of snap.docs) {
      const studentProfile = docSnap.data() as UserProfile;
      // Busca stats do aluno
      const stats = await loadCloudUserStats(studentProfile.uid);
      // Busca últimos 3 treinos
      const recentWorkouts = await loadCloudWorkoutHistory(studentProfile.uid);

      students.push({
        profile: studentProfile,
        stats: stats || undefined,
        recentWorkouts: recentWorkouts.slice(0, 3)
      });
    }

    return students;
  } catch (error) {
    console.warn('Erro ao buscar lista de alunos para o treinador:', error);
    return [];
  }
}
