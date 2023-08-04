import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyC6LbWblHHHW92JZaswbmyYokiiD-yy2ZY",
authDomain: "password-manager-82d8a.firebaseapp.com",
databaseURL: "https://password-manager-82d8a-default-rtdb.europe-west1.firebasedatabase.app",
projectId: "password-manager-82d8a",
storageBucket: "password-manager-82d8a.appspot.com",
messagingSenderId: "817794945683",
appId: "1:817794945683:web:78aef1bcb95c04bc44b366",
measurementId: "G-S1XCNW45C0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
