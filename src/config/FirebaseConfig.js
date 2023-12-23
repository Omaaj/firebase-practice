import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWeoOZ4lAQrprx2txn1d32wM8MZtuNNCs",
  authDomain: "fir-novice-ce3c7.firebaseapp.com",
  projectId: "fir-novice-ce3c7",
  storageBucket: "fir-novice-ce3c7.appspot.com",
  messagingSenderId: "134862259732",
  appId: "1:134862259732:web:587770943d057b874d4901",
  measurementId: "G-ZMHCM83JJG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
