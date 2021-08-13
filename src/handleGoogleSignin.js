import * as Google from 'expo-google-app-auth';
import * as SecureStore from 'expo-secure-store';
import firebase from 'firebase/app';
import {firstSignUp,alreadySignup} from './firebaseCall';
import notification from './notification';

const handleGoogleSignin = async () => {
  
    const config = {
      expoClientId:`61530148512-k3kf2goaklr8r1k18csko0uk295n4i19.apps.googleusercontent.com`,
      iosClientId: `61530148512-vv55cqn7ga0gkkcn0dlfeuv535qofgui.apps.googleusercontent.com`,
      androidClientId: `61530148512-h8b2lmf0iesre05g89cnpv58ofv26ur0.apps.googleusercontent.com`,
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