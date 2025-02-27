// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2VRHPGAEByCBZfI4DSJp2O9GSHI9N1Tc",
  authDomain: "selfteach-6a4db.firebaseapp.com",
  projectId: "selfteach-6a4db",
  storageBucket: "selfteach-6a4db.firebasestorage.app",
  messagingSenderId: "1068704535841",
  appId: "1:1068704535841:web:48bb1d715a5e8160251a60",
  measurementId: "G-WNXK4KLN76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
console.log(db);
export const auth = getAuth(app);
