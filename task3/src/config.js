
import firebase from 'firebase';

// Change you firebase settings here 
const firebaseConfig = {
    apiKey: "AIzaSyAxtFby14zKqIoN5NOUQ2gzzCdVgfFJsPY",
    authDomain: "database-authentication.firebaseapp.com",
    databaseURL: "https://database-authentication.firebaseio.com",
    projectId: "database-authentication",
    storageBucket: "database-authentication.appspot.com",
    messagingSenderId: "1070308307367"
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth;