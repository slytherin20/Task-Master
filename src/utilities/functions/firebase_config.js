  import firebase from "firebase";
  import 'firebase/firestore';

    var firebaseConfig = {
    apiKey: "AIzaSyDrhRJYnzZXslzMXfxq33G257F5hB9CauI",
    authDomain: "track-me-16373.firebaseapp.com",
    projectId: "track-me-16373",
    storageBucket: "track-me-16373.appspot.com",
    messagingSenderId: "931245251792",
    appId: "1:931245251792:web:52779e95443e86f19452d5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  export const auth = firebase.auth();

  export default db;