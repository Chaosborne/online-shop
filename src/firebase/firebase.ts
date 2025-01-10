// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { firebaseApiKey } from './firebaseApiKey';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: 'eco-village-d5d6d.firebaseapp.com',
  databaseURL: 'https://eco-village-d5d6d-default-rtdb.firebaseio.com',
  projectId: 'eco-village-d5d6d',
  storageBucket: 'eco-village-d5d6d.firebasestorage.app',
  messagingSenderId: '544483561624',
  appId: '1:544483561624:web:d67843478bba766e1180ed',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//// помечаем, что переменная используется, но ничего не делаем с ней,
// чтобы убрать ошибку 'app' is assigned a value but never used,
// пока не продолжили разработку и не начали использование переменной app
void firebaseApp; // когда начнем использовать firebaseApp, всю строку удалим
////
