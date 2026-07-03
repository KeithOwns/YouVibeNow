// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcKyKgXjF5n_00AAnSpYVFDvJ7UGIcDi8",
  authDomain: "youvibenow-8290f.firebaseapp.com",
  projectId: "youvibenow-8290f",
  storageBucket: "youvibenow-8290f.firebasestorage.app",
  messagingSenderId: "52181977502",
  appId: "1:52181977502:web:0b822b856b85c2d5b9ae8f",
  measurementId: "G-B6K0XRN7PW"
};

// Initialize Firebase
let app;
let db;
try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
} catch (err) {
    console.warn("Firebase initialization error:", err);
}

export { db };
