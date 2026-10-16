// ========================================
// ZONGO BLOG — FIREBASE CONFIGURATION
// ========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// ========================================
// FIREBASE PROJECT CONFIGURATION
// ========================================

const firebaseConfig = {

    apiKey:
        "AIzaSyAC3qCkDfdS2X8YA6deg01lXif7qAStfQQ",

    authDomain:
        "neostore-81b57.firebaseapp.com",

    projectId:
        "neostore-81b57",

    storageBucket:
        "neostore-81b57.firebasestorage.app",

    messagingSenderId:
        "760637387702",

    appId:
        "1:760637387702:web:3c7c231c34a3513d1a4717"

};

// ========================================
// INITIALIZE FIREBASE
// ========================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

// ========================================
// EXPORT FIREBASE SERVICES
// ========================================

export { app, db, auth };

