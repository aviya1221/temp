// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnLTMMMU4CnFZFWZDBAFb5p8Ka030XrLQ",
  authDomain: "emailserver-ac.firebaseapp.com",
  projectId: "emailserver-ac",
  storageBucket: "emailserver-ac.firebasestorage.app",
  messagingSenderId: "677185020813",
  appId: "1:677185020813:web:7c60e4e2fd1c49a04fd3c4",
  measurementId: "G-PM7LJMTR6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services to use in your app
export const db = getFirestore(app);    // חיבור ל־Firestore
export const auth = getAuth(app);       // חיבור ל־Authentication
