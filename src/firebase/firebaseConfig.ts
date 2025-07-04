// Firestore (Also change in getDBProductsSlice.ts)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseApiKey } from './firebaseApiKey';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: 'eco-village-d5d6d.firebaseapp.com',
  projectId: 'eco-village-d5d6d',
  storageBucket: 'eco-village-d5d6d.firebasestorage.app',
  messagingSenderId: '544483561624',
  appId: '1:544483561624:web:d67843478bba766e1180ed',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
