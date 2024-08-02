// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOcGLtmJNHHB2NUuJLgGt1mTMsMPk9FH4",
  authDomain: "whatsapp-cloud-api-e9353.firebaseapp.com",
  projectId: "whatsapp-cloud-api-e9353",
  storageBucket: "whatsapp-cloud-api-e9353.appspot.com",
  messagingSenderId: "388243991795",
  appId: "1:388243991795:web:757778a416e178c1359b86",
  measurementId: "G-N7KNJV25TV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };