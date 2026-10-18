/**
 * Firebase Web Configuration & Initialization
 * Project: munomoviess
 * Features: Google Auth, Email/Password Auth, Realtime Database
 */

import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User 
} from "firebase/auth";
import { getDatabase, ref, set, get, child, onValue, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAmx1I4mG4OQ1IzurqrFD-E56-OJv7ug5k",
  authDomain: "munomoviess.firebaseapp.com",
  databaseURL: "https://munomoviess-default-rtdb.firebaseio.com",
  projectId: "munomoviess",
  storageBucket: "munomoviess.firebasestorage.app",
  messagingSenderId: "86379072218",
  appId: "1:86379072218:web:e1481fb579c5a7dc98b3e3",
  measurementId: "G-9N7M22YQW0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();

// Auth Helpers
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    // Save user profile in Realtime Database
    await set(ref(db, `users/${user.uid}`), {
      uid: user.uid,
      displayName: user.displayName || 'User',
      email: user.email,
      photoURL: user.photoURL,
      lastLogin: Date.now()
    });
    return user;
  } catch (error) {
    console.error("Google Auth error:", error);
    throw error;
  }
}

export async function logoutUser() {
  await signOut(auth);
}

// Realtime Database Watchlist / Saved Helpers
export async function saveMovieToDatabase(userId: string, movie: any) {
  try {
    await set(ref(db, `users/${userId}/watchlist/${movie.id}`), {
      ...movie,
      savedAt: Date.now()
    });
  } catch (error) {
    console.error("Database save error:", error);
  }
}

export async function removeMovieFromDatabase(userId: string, movieId: string) {
  try {
    await remove(ref(db, `users/${userId}/watchlist/${movieId}`));
  } catch (error) {
    console.error("Database remove error:", error);
  }
}
