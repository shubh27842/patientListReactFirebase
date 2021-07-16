import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDX1rGE2-g1gmXFFdO4Xrae3C8qYY3oVbY",
    authDomain: "patientinfo-d9fd0.firebaseapp.com",
    projectId: "patientinfo-d9fd0",
    storageBucket: "patientinfo-d9fd0.appspot.com",
    messagingSenderId: "14124036044",
    appId: "1:14124036044:web:c18f89cad8e4cb004cf769",
    measurementId: "G-30G2PKX36P"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.database();
