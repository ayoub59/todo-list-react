// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyAs_oOngT4O3DiqNtuh5yq4KhS4LSTnnhc",
    authDomain: "react-todlist.firebaseapp.com",
    projectId: "react-todlist",
    storageBucket: "react-todlist.appspot.com",
    messagingSenderId: "642965575127",
    appId: "1:642965575127:web:7ba3406543fb4ccb7ce792",
    measurementId: "G-ZCFMS4BJ15"
});
const db = firebase.firestore();
export default db;