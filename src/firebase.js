import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCmg2T2MG1IbvVQtW9RtvgR0nNZ-Uw4LEU",
  authDomain: "wordsidontknow-e3a68.firebaseapp.com",
  databaseURL: "https://wordsidontknow-e3a68.firebaseio.com",
  projectId: "wordsidontknow-e3a68",
  storageBucket: "wordsidontknow-e3a68.appspot.com",
  messagingSenderId: "39758952653",
  appId: "1:39758952653:web:4dc5d230be022907b4d184",
  measurementId: "G-WFRGXTNL7Q",
};

firebase.initializeApp(config);
export const database = firebase.database();
export const auth = firebase.auth();
export default firebase;
