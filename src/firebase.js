import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAMdddrwjE_X6i0dMSvc5sqthdRcY_5oo",
    authDomain: "studentmanagement-2d46f.firebaseapp.com",
    databaseURL: "https://studentmanagement-2d46f.firebaseio.com",
    projectId: "studentmanagement-2d46f",
    storageBucket: "studentmanagement-2d46f.appspot.com",
    messagingSenderId: "252647460519",
    appId: "1:252647460519:web:b628ac6199159667709582",
    measurementId: "G-LENWBJG24B"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;