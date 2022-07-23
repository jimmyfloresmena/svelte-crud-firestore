import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCqoTOYMHMDKzoOqz3sBCQu6gie2qOu9Qw",
  authDomain: "svelte-crud-d7dd4.firebaseapp.com",
  projectId: "svelte-crud-d7dd4",
  storageBucket: "svelte-crud-d7dd4.appspot.com",
  messagingSenderId: "323868535830",
  appId: "1:323868535830:web:963856fe2ea70defaad937"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);