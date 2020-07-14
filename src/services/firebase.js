import firebase from 'firebase';
import firebaseConfig from '../config'; {/* firebase credetials */}


firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.database();
