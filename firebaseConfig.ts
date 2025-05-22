import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHmYTyjJUbbu39XE0puodx0uXLtRVZnhQ",
  authDomain: "nutribem-web.firebaseapp.com",
  projectId: "nutribem-web",
  storageBucket: "nutribem-web.firebasestorage.app",
  messagingSenderId: "588351291040",
  appId: "1:588351291040:web:1cfa380b89b4c650ac53c5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
