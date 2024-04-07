import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAMUitxvN6-GlXO-W6H_2ZrAqmvbSh9sJo",
    authDomain: "lab-4-info-6132.firebaseapp.com",
    databaseURL: "https://lab-4-info-6132-default-rtdb.firebaseio.com",
    projectId: "lab-4-info-6132",
    storageBucket: "lab-4-info-6132.appspot.com",
    messagingSenderId: "962861163810",
    appId: "1:962861163810:web:583fd3f5fb0ef76044317b",
    measurementId: "G-0Y075JT7L0"
  };

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export default firestore;
