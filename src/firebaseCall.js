import React,{useContext} from 'react';
import firebase from 'firebase'
import firebaseInit from './firebaseInit';
// import {UserInfoContext} from './UserInfoContext';

firebaseInit()

// const [userInfo, setUserInfo] = useContext(UserInfoContext);

export async function throwOrder(order, point, userId) {
  
    firebase
      .database()
      .ref('users/' + userId)
      .set({
        order: order,
        point: point,
        regiDate: new Date()
      });
  }

  
  export async function addPoint(uid,point,amount,action) {
  
    firebase
      .database()
      .ref('point/' + uid)
      .update({
        totalPoint: point+Number(amount)
      });
  
    firebase
      .database()
      .ref('point/' + uid + '/pointLog')
      .push({
        action: action,
        changePoint: amount,
        regiDate: new Date()
      });
  }


export async function firstSignUp(result) {
  firebase
    .database()
    .ref('users/' + result.user.uid)
    .set({
      uid: result.user.uid,
      gmail: result.user.email,
      profile_picture: result.additionalUserInfo.profile.picture,
      name: result.additionalUserInfo.profile.given_name,
      created_at: Date.now(),
      last_logged_in: Date.now()
    });

  firebase
  .database()
  .ref('point/'+result.user.uid)
  .set({
    totalPoint:1000
  });
  
  firebase
    .database()
    .ref('point/'+result.user.uid+'/pointLog')
    .push({
      action:"signUp",
      changePoint:1000
    });
}

export async function alreadySignup(result) {
  firebase
    .database()
    .ref('users/' + result.user.uid)
    .update({
      last_logged_in: Date.now()
    });
}