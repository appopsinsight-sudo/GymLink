
/* ═══════════════════════════════════════════════════
   GymLink — Firebase setup (PR 1: Auth + User Profile)
   Config is read from Vercel env vars (VITE_FIREBASE_*).
   ═══════════════════════════════════════════════════ */
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as fbSignOut,
  onAuthStateChanged as fbOnAuthStateChanged,
  deleteUser,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env?.VITE_FIREBASE_APP_ID || "",
};

// True only when all required env vars are present. Used so the app can
// degrade gracefully (fall back to localStorage) if Firebase isn't configured.
export const firebaseReady = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let app = null, auth = null, db = null;
if (firebaseReady) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}
export { auth, db };

const googleProvider = new GoogleAuthProvider();

/* ─── Auth helpers ─── */

// Subscribe to auth state. Returns an unsubscribe fn.
// If Firebase isn't configured, immediately reports "no user" so the app boots.
export const onAuthChange = (cb) => {
  if (!firebaseReady) { cb(null); return () => {}; }
  return fbOnAuthStateChanged(auth, cb);
};

export const signUpWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email.trim(), password);

export const signInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email.trim(), password);

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const resetPassword = (email) =>
  sendPasswordResetEmail(auth, email.trim());

export const signOutUser = () => (firebaseReady ? fbSignOut(auth) : Promise.resolve());

// Friendly messages for the Firebase Auth error codes users actually hit.
export const authErrorMessage = (err) => {
  const code = err?.code || "";
  const map = {
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect password. Try again.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/email-already-in-use": "An account already exists with that email.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/popup-closed-by-user": "Sign-in was cancelled.",
    "auth/popup-blocked": "Pop-up blocked. Allow pop-ups and try again.",
    "auth/cancelled-popup-request": "Sign-in was cancelled.",
    "auth/account-exists-with-different-credential":
      "You signed up using a different method. Try \"Continue with Google\".",
    "auth/network-request-failed": "Network error. Check your connection.",
    "auth/too-many-requests": "Too many attempts. Please wait and try again.",
  };
  return map[code] || "Something went wrong. Please try again.";
};

/* ─── Firestore user profile helpers ─── */
// User documents live at users/{uid}.

export const fetchUserProfile = async (uid) => {
  if (!firebaseReady || !uid) return null;
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
};

// Write/merge the profile. Always merges so partial updates are safe.
export const saveUserProfile = async (uid, profile) => {
  if (!firebaseReady || !uid) return;
  await setDoc(
    doc(db, "users", uid),
    { ...profile, uid, updatedAt: serverTimestamp() },
    { merge: true }
  );
};

export const deleteUserProfile = async (uid) => {
  if (!firebaseReady || !uid) return;
  await deleteDoc(doc(db, "users", uid));
};

// Remove the Firebase Auth account itself (used by Delete Account).
export const deleteAuthUser = async () => {
  if (!firebaseReady || !auth?.currentUser) return;
  await deleteUser(auth.currentUser);
};
