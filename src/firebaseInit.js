import firebase from "firebase";

const firebaseInit = () => {
var firebaseConfig = {
    apiKey: "AIzaSyDiKbD5nKPzLNKQ2i8zHKHR6VHn1AYjlis",
    authDomain: "zolzac-60337.firebaseapp.com",
    projectId: "zolzac-60337",
    storageBucket: "zolzac-60337.appspot.com",
    messagingSenderId: "391665152004",
    appId: "1:391665152004:web:0ef3da2ae6338085544551",
    measurementId: "G-L639YSSKJT"
  };
  // Initialize Firebase
  if(firebase.apps.length==0){
    firebase.initializeApp(firebaseConfig);
  }
}

  export default firebaseInit;