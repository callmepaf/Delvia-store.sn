import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

// Safe to expose in client code — this only identifies which Firebase
// project to talk to. Actual access control lives in Firestore/Storage rules.
// Values come from .env.local (gitignored) — see .env.example.
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
