
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// import "firebase/compat/auth";
// import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbErQcLTK9fbXkQdTG3vpu3xLWJNkdIeA",
  authDomain: "clone-8c1c7.firebaseapp.com",
  projectId: "clone-8c1c7",
  storageBucket: "clone-8c1c7.firebasestorage.app",
  messagingSenderId: "399654930725",
  appId: "1:399654930725:web:aacc674b00a64c987c32cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)
