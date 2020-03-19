import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA19YJmTHktdmkCeBwxZ1_GIZp5K4zX3Cw',
  authDomain: 'login-7b322.firebaseapp.com',
  databaseURL: 'https://login-7b322.firebaseio.com',
  projectId: 'login-7b322',
  storageBucket: 'login-7b322.appspot.com',
  messagingSenderId: '405116870052',
  appId: '1:405116870052:web:aa3ee117deb62a1c88b531',
  measurementId: 'G-92V8THWLPF'
}

// Access to services
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const microsoftProvider = new firebase.auth.OAuthProvider('microsoft.com');
export const yahooProvider = new firebase.auth.OAuthProvider('yahoo.com');
export const emailAuthProvider = new firebase.auth.EmailAuthProvider();

// Initial Firebase
export const initialFirebase = firebase.initializeApp(firebaseConfig);
export const fb = firebase;

export default initialFirebase;