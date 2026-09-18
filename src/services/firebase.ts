import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDLNyAl3FgAAgUBSj95jlGpMvPrcsUr9ro",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "academy-lopes.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "academy-lopes",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "academy-lopes.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "234911379825",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:234911379825:web:2c0ee15768552ac6da46d0",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-9K4GX0FLXT"
};

// Evita inicializações duplicadas
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
