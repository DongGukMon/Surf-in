import * as Google from 'expo-google-app-auth';
import * as SecureStore from 'expo-secure-store';
import firebase from 'firebase/app';
import {firstSignUp,alreadySignup} from './firebaseCall';
import notification from './notification';

const handleGoogleSignin = async () => {

  
    const config = {
      expoClientId:`61530148512-k3kf2goaklr8r1k18csko0uk295n4i19.apps.googleusercontent.com`,
      iosClientId: `391665152004-56do0e2b1n058707b7atdpa3uobhb20v.apps.googleusercontent.com`,
      androidClientId: `391665152004-5ih8inrs23aa25q6ielo37o0h3aj3kn2.apps.googleusercontent.com`,
      androidStandaloneAppClientId: `391665152004-5ih8inrs23aa25q6ielo37o0h3aj3kn2.apps.googleusercontent.com`,
      scopes: ['profile', 'email'],
    };

    Google.logInAsync(config)
      .then((result) => {
        if (result.type == 'success') {
          var credential = firebase.auth.GoogleAuthProvider.credential(
            result.idToken,
            result.accessToken
          );
        }
        firebase.auth().signInWithCredential(credential).then((result)=>{
          notification(result);

          if (result.additionalUserInfo.isNewUser) {
            firstSignUp(result)
          } else {
            alreadySignup(result)
            }
        })
      })
      .catch((error) => {
        console.log(error);
      });
      
  };
  
  export default handleGoogleSignin




