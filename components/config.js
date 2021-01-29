import firebase from 'firebase'
require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyAC2ALoaYcuV6BHb7diACAOuG8E8Ogsc1g",
    authDomain: "book-santa-9e261.firebaseapp.com",
    projectId: "book-santa-9e261",
    storageBucket: "book-santa-9e261.appspot.com",
    messagingSenderId: "967163523879",
    appId: "1:967163523879:web:ff744a3127297156db2f02"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
export default firebase.firestore()