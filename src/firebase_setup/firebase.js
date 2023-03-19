// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDoc, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKsMUXglpFOhhoi7Ta_Ve_gkuoNRJZlKo",
  authDomain: "basketball-react.firebaseapp.com",
  projectId: "basketball-react",
  storageBucket: "basketball-react.appspot.com",
  messagingSenderId: "476548975437",
  appId: "1:476548975437:web:7e793d6a306948844e8504",
  measurementId: "G-8BC67WLT4V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
const analytics = getAnalytics(app);