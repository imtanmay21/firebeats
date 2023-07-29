// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeFAbYqhufJOdPZULbJiAtTou_8vItvhY",
  authDomain: "firebeats-da1b9.firebaseapp.com",
  projectId: "firebeats-da1b9",
  storageBucket: "firebeats-da1b9.appspot.com",
  messagingSenderId: "1080825624235",
  appId: "1:1080825624235:web:53497d4ea4a06c43e4a9ee",
  measurementId: "G-5K9W3TJ0H7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
