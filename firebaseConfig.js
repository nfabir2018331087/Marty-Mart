// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt-AWJnS1hBi_mVi0-Mv6HW2-pa5DEwyE",
  authDomain: "forimage-52197.firebaseapp.com",
  projectId: "forimage-52197",
  storageBucket: "forimage-52197.appspot.com",
  messagingSenderId: "1004011096838",
  appId: "1:1004011096838:web:60e38c758359c99a8dec87",
  measurementId: "G-ER3VJL0HMQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage();