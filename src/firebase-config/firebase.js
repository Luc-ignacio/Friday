import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyUDUvv96NR4NsltwKLHlolGqkM6SDN3I",
  authDomain: "fir-crash-course-51c8c.firebaseapp.com",
  projectId: "fir-crash-course-51c8c",
  storageBucket: "fir-crash-course-51c8c.firebasestorage.app",
  messagingSenderId: "934873304852",
  appId: "1:934873304852:web:16fb1a99e90eaece067c01",
};

const app = initializeApp(firebaseConfig);

export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
