// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDwE_aAlT0CsNe2xsE9mWszC2P4g4ycAWg",
  authDomain: "bookspace-802f9.firebaseapp.com",
  projectId: "bookspace-802f9",
  storageBucket: "bookspace-802f9.appspot.com",
  messagingSenderId: "634318152567",
  appId: "1:634318152567:web:fa0066e6837b05da1bf772"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
export const booksRef =collection(db,"books");
export const reviewsRef=collection(db,"reviews");
export const usersRef=collection(db,"users");


export default app;