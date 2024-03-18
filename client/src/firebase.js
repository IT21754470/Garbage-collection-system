// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlFCPMZeRKwE8OkauG5jnpZWFigwi9bHI",
  authDomain: "mern-state-new.firebaseapp.com",
  projectId: "mern-state-new",
  storageBucket: "mern-state-new.appspot.com",
  messagingSenderId: "677142566445",
  appId: "1:677142566445:web:dd36bdffd938e918038aa4",
  measurementId: "G-DSRZGKJ5RW"
};

// Initialize Firebase
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

