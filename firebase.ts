
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyAWXNr4DFkWMTZVz_gjhh33ho4YMu5aeAo",
  authDomain: "drop-it-aba28.firebaseapp.com",
  projectId: "drop-it-aba28",
  storageBucket: "drop-it-aba28.appspot.com",
  messagingSenderId: "848400426253",
  appId: "1:848400426253:web:9f25987e8a22c40857bc44",
  measurementId: "G-87QK9VDVBN"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };