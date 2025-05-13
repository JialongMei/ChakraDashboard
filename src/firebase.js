import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCg7Pac4gCoJm8cR7RD90PEKNhAtJxxbGo",
  authDomain: "backendtask1.firebaseapp.com",
  projectId: "backendtask1",
  storageBucket: "backendtask1.firebasestorage.app",
  messagingSenderId: "493185936451",
  appId: "1:493185936451:web:797e43d531ac39183fb8f6",
  measurementId: "G-YVL099FNQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);