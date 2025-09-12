import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFcxRaSNr0TKg-OGkFEx6Jq7eyd39nibk",
  authDomain: "cynex-e1583.firebaseapp.com",
  projectId: "cynex-e1583",
  storageBucket: "cynex-e1583.firebasestorage.app",
  messagingSenderId: "461755187718",
  appId: "1:461755187718:web:78c60da82684bf7ef87987",
  measurementId: "G-REESGS9P91"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);