// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Load environment variables from .env

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAw7hiTtmNVSLcWpL4C0YzJeyxTfqawXeI",
  authDomain: "hackathon-f6a54.firebaseapp.com",
  projectId: "hackathon-f6a54",
  storageBucket: "hackathon-f6a54.appspot.com",
  messagingSenderId: "1082737885407",
  appId: "1:1082737885407:web:9e744bd082b256cdefe96a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db };
export { auth };
