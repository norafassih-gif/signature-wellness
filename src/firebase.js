import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Vos clés de connexion secrètes
const firebaseConfig = {
  apiKey: "AIzaSyDkc2r-2pEqiFwcDB9cgtpUCfcCI9U6Img",
  authDomain: "signature-wellness-7c4e1.firebaseapp.com",
  projectId: "signature-wellness-7c4e1",
  storageBucket: "signature-wellness-7c4e1.firebasestorage.app",
  messagingSenderId: "655295570900",
  appId: "1:655295570900:web:cc64953199d806cbc2ac41"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// On exporte l'authentification et la base de données pour les utiliser ailleurs
export const auth = getAuth(app);
export const db = getFirestore(app);