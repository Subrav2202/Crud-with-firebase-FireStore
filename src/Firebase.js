import firebase from "firebase/app"
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyAC0uDKdAuHLkK_WSYX7-DGKQN4OM3y_jg",
    authDomain: "fir-c09b7.firebaseapp.com",
    projectId: "fir-c09b7",
    storageBucket: "fir-c09b7.appspot.com",
    messagingSenderId: "973322526200",
    appId: "1:973322526200:web:596c05d6b6bd3e137c4a0d"
})
  
export const db=firebase.firestore();
