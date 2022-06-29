import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBaCAXmCf-PUWNK_2TPlLZwkAzYLrxE7jg",
  authDomain: "todos-8a83e.firebaseapp.com",
  databaseURL: "https://todos-8a83e-default-rtdb.firebaseio.com",
  projectId: "todos-8a83e",
  storageBucket: "todos-8a83e.appspot.com",
  messagingSenderId: "135585508515",
  appId: "1:135585508515:web:f2e2a6b2e8a5f04889e316",
  measurementId: "G-3C86GC2MXJ",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
