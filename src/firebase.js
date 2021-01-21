import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAUJG3LH-XzBWhcgl3FW07mCO3ZPXh9paw",
    authDomain: "snapchat-clone-ac4be.firebaseapp.com",
    projectId: "snapchat-clone-ac4be",
    storageBucket: "snapchat-clone-ac4be.appspot.com",
    messagingSenderId: "1005352657371",
    appId: "1:1005352657371:web:0a051e40dc3ea71580c7fe",
    measurementId: "G-YBWLW9MP0X"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const auth = firebase.auth();
const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider, storage};