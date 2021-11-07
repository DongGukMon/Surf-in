import Constants from 'expo-constants';
import React, {useState} from 'react';
import * as Notifications from 'expo-notifications';
import firebase from 'firebase';
import firebaseInit from './firebaseInit';

firebaseInit()

export default async function notification(result) {
    var expoToken = "";

    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        }
        if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        expoToken = token;

    } else {
        alert('Must use physical device for Push Notifications');
    }
    
    firebase
    .database()
    .ref('pushToken/' + result.user.uid)
    .set({
        expoToken
    });
    
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        });
    }
    


};

export async function pushNearFriends(nearFirends) {
  
    const toPush =[] 
    firebase.database().ref('pushToken').once('value',async(snapshot)=>{
        nearFirends.map((current)=>{

            toPush.push(snapshot.val()[current["uid"]]["expoToken"])
        })

  

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            //   Authorization: key=`AAAAWzEP8AQ:APA91bFkAehXNlIstOSFEUE44ObvNmp0Ki5PWp4Fik2Mtf181rnsURDCdFCO1JSvMNfMbDOSvabCow1MkwRmJ0kZZETRBSZGTrwwEps_EHW4uvHaLLK2SITFi11U7cvuf86td2IEQeRV`,
            },
            body: JSON.stringify({
              to: toPush,
              sound: 'default',
              title: "반가워요",
              body: "주변에 있으시군요!",
              }),
            },
        )
    })

}

export async function pushMyFriends(firend) {
   
    firebase.database().ref('pushToken/'+firend.uid).once('value',async(snapshot)=>{

        const toPush = snapshot.val()["expoToken"]

  

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            //   Authorization: key=`AAAAWzEP8AQ:APA91bFkAehXNlIstOSFEUE44ObvNmp0Ki5PWp4Fik2Mtf181rnsURDCdFCO1JSvMNfMbDOSvabCow1MkwRmJ0kZZETRBSZGTrwwEps_EHW4uvHaLLK2SITFi11U7cvuf86td2IEQeRV`,
            },
            body: JSON.stringify({
              to: toPush,
              sound: 'default',
              title: "반갑다 친구야",
              body: "나야나 오늘밤 주인공은 나야나",
              }),
            },
        )
    })

}