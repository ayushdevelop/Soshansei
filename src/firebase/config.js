import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9ENrtzKQQKX-VYjT_PBAOV0OZor5uj-0",
  authDomain: "shosansei.firebaseapp.com",
  projectId: "shosansei",
  storageBucket: "shosansei.appspot.com",
  messagingSenderId: "1013305215391",
  appId: "1:1013305215391:web:9f1436f1f4e01cc9e295aa",
};

firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp

const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
