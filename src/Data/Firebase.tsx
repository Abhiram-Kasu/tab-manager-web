
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/database';
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain:import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};



firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.firestore();