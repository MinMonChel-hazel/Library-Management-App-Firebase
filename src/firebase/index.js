import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzAZ58I0s9EIKU84EOoPoGXBMzOg3OURU",
  authDomain: "books-library-e9327.firebaseapp.com",
  projectId: "books-library-e9327",
  storageBucket: "books-library-e9327.firebasestorage.app",
  messagingSenderId: "99188586410",
  appId: "1:99188586410:web:adca8d54cec8ae8f419dd3",
  measurementId: "G-B9P6GHSN62"
};

const app = initializeApp(firebaseConfig);

let db = getFirestore(app);
let auth = getAuth(app);

export { db , auth}
