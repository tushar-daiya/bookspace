// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'
console.log(process.env.REACT_APP_API_KEY)
console.log(process.env.REACT_APP_AUTH_DOMAIN)
console.log(process.env.REACT_APP_PROJECT_ID)
console.log(process.env.REACT_APP_STORAGE_BUCKET)
console.log(process.env.REACT_APP_MESSAGING_SENDER_ID)
console.log(process.env.REACT_APP_APP_ID)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
export const booksRef =collection(db,"books");
export const reviewsRef=collection(db,"reviews");
export const usersRef=collection(db,"users");


export default app;