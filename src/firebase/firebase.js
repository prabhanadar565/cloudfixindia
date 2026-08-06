// Firebase Core
import { initializeApp } from "firebase/app";

// Firestore Database
import { getFirestore } from "firebase/firestore";

// Authentication
import { getAuth } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJOUblGM7iYsIEMJJY5IMDhqQ_UXOwZMk",
  authDomain: "cloudfix-india.firebaseapp.com",
  projectId: "cloudfix-india",
  storageBucket: "cloudfix-india.firebasestorage.app",
  messagingSenderId: "584381428674",
  appId: "1:584381428674:web:e52585fe6c929b3ec09c5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

// Authentication
const auth = getAuth(app);

export { app, db, auth };