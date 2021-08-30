 import * as firebase from 'firebase';
 import 'firebase/firebase-auth'
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDhujPw6_3dCzr_WU92JZq2HfYQA0GNEz8",
    authDomain: "budgbuds.firebaseapp.com",
    projectId: "budgbuds",
    storageBucket: "budgbuds.appspot.com",
    messagingSenderId: "617564275969",
    appId: "1:617564275969:web:e9052eb81b038406a48700"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var fireAuth = firebase.auth();
  export default fireAuth;