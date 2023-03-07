// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//allows you to connect to db
import {getFirestore} from 'firebase/firestore'

//for auth
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwtzNbtoiywgCjmofMzqZc_J4XTAvvtpo",
  authDomain: "learning-log-2f30b.firebaseapp.com",
  projectId: "learning-log-2f30b",
  storageBucket: "learning-log-2f30b.appspot.com",
  messagingSenderId: "1021653264116",
  appId: "1:1021653264116:web:29b1b6285a487dc1cb20a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//set up auth and export it
export const auth = getAuth(app)

//set up database and export it
export const db = getFirestore(app)