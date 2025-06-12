import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyDtDdthIVsZl3WXlUDfJLpnoJfxJODq0HQ",
  authDomain: "my-awesome-project-id-12ff9.firebaseapp.com",
  databaseURL: "https://my-awesome-project-id-12ff9.firebaseio.com",
  projectId: "my-awesome-project-id-12ff9",
  storageBucket: "my-awesome-project-id-12ff9.firebasestorage.app"
  /*messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"*/
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);
const db = getFirestore(app);

export { auth, db, storage, firestore };

