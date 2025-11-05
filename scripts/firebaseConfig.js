import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5yKVB9y8E1KhB4TlNAc6Tb5B7drEsWB8",
  authDomain: "rizwan1-63e5f.firebaseapp.com",
  projectId: "rizwan1-63e5f",
  storageBucket: "rizwan1-63e5f.firebasestorage.app",
  messagingSenderId: "131859817757",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
