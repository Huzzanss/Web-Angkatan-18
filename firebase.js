// ── FIREBASE CONFIG ──────────────────────────────────────────
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjBlxLKzUE7wHOrvLNoFo6PSpBk4f6kKA",
  authDomain: "xviii-website.firebaseapp.com",
  databaseURL: "https://xviii-website-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "xviii-website",
  storageBucket: "xviii-website.firebasestorage.app",
  messagingSenderId: "1049343763003",
  appId: "1:1049343763003:web:e1d9dec47dfb7c3540721e"
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

export { db, ref, push, onValue, remove };
