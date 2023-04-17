import { initializeApp } from '@firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBdMug76CY4zpI-J5S3eDR9rVUUgRiEHIo",
  authDomain: "chlarity.firebaseapp.com",
  projectId: "chlarity",
  storageBucket: "chlarity.appspot.com",
  messagingSenderId: "392600507057",
  appId: "1:392600507057:web:1e9f3e8c81322c59a98890"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);