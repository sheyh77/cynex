// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging"; // FCM

const firebaseConfig = {
  apiKey: "AIzaSyCFcxRaSNr0TKg-OGkFEx6Jq7eyd39nibk",
  authDomain: "cynex-e1583.firebaseapp.com",
  projectId: "cynex-e1583",
  storageBucket: "cynex-e1583.appspot.com",
  messagingSenderId: "461755187718",
  appId: "1:461755187718:web:78c60da82684bf7ef87987",
  measurementId: "G-REESGS9P91"
};

// Firebase appni initialize qilish
export const app = initializeApp(firebaseConfig);

// Xizmatlarni export qilish
export const auth = getAuth(app);         // Firebase Auth
export const db = getFirestore(app);      // Firestore Database
export const storage = getStorage(app);   // Firebase Storage
export const messaging = getMessaging(app); // Firebase Cloud Messaging (FCM)