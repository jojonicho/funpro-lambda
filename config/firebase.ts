// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// const firebase = require("firebase");
// require("firebase/firestore");

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyA6ewGatdZWemP3OIbkxoiro-g5STLvzPQ",
  authDomain: "pemfung.firebaseapp.com",
  projectId: "pemfung",
  storageBucket: "pemfung.appspot.com",
  messagingSenderId: "1082767394229",
  appId: "1:1082767394229:web:806cd9b2b42bdda7bcc5fc",
};

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
