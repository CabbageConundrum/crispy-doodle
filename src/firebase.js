//firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB43FwHv5hYzZFcXMCI-bU_tIgKkTmxI-Q",
    authDomain: "bookshelf-12004.firebaseapp.com",
    projectId: "bookshelf-12004",
    storageBucket: "bookshelf-12004.appspot.com",
    messagingSenderId: "643261498494",
    appId: "1:643261498494:web:0996df5de7eea2f76c842f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// this exports the CONFIGURED version of firebase
export default firebase;