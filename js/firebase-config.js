// Import the required Firebase modules
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBG1E5d6CTmwlGxiPc3YVBCUF-_uIrq8vs",
  authDomain: "aws-scoe.firebaseapp.com",
  projectId: "aws-scoe",
  storageBucket: "aws-scoe.appspot.com",
  messagingSenderId: "672219389679",
  appId: "1:672219389679:web:42fd3fb758668635b3c51a",
  measurementId: "G-RQPPJH6JCC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Initialize Firestore Database
const db = getFirestore(app);

// Export Firebase modules for use across the project
export { app, analytics, auth, provider, db };