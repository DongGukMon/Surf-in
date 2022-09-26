import firebase from "firebase";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE__BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUERMENT_ID,
} from "./constants";

const firebaseInit = () => {
  var firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE__BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUERMENT_ID,
  };
  // Initialize Firebase
  if (firebase.apps.length == 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

export default firebaseInit;
