import React from 'react';
import {Text,View} from 'react-native';
import {getPreciseDistance, isPointWithinRadius} from 'geolib';
import firebase from 'firebase';
import firebaseInit from './firebaseInit';

firebaseInit();

const arr=[
    {latitude:37.88142870550673, longitude:127.73010838445867},
    {latitude:37.870985971309736, longitude:127.74649354046008},
    {latitude:37.872607697281595, longitude:127.74939511550627},
    {latitude:37.86073364205741, longitude:127.74908788375991},
    {latitude:37.89323367841997, longitude:127.75577916098804}
  ]

function alertLocation (location,uid) {
  
  var nearFriends=[];
  var checkArr=[];
  location=location["location"]

  var lati =location["coords"]["latitude"]
  var longi =location["coords"]["longitude"]


  firebase.database().ref('location').once('value', (snapshot) => {
 
    const total = Object.values(snapshot.val()).length
    
    
    Object.values(snapshot.val()).map((current)=>{
    
    var radiusLocation = isPointWithinRadius(
        { latitude: lati, longitude: longi },
        { latitude: current["latitude"], longitude: current["longitude"] },
        10000
      );


      if(radiusLocation && (JSON.stringify(uid) !== JSON.stringify(current["uid"]))){

        var pdis = getPreciseDistance(
          {latitude: location["coords"]["latitude"], longitude: location["coords"]["longitude"]},
          {latitude: current["latitude"], longitude: current["longitude"]},
        );
        
        firebase.database().ref('users/'+current["uid"]+'/name').once('value', (snapshot) => {

          nearFriends.push({
            name:snapshot.val(),
            distance: pdis
          })
          checkArr.push(true)
          if (checkArr.length == total) {
            alert(`name: ${nearFriends[0].name}\n distance: ${nearFriends[0].distance}`)
          }
          
        })
      } else {
        checkArr.push(true)
        if (checkArr.length == total) {
          alert(`name: ${nearFriends[0].name}\n distance: ${nearFriends[0].distance}`)
        }

      }
    })
  })
}

export default alertLocation;