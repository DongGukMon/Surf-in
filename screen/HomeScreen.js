import React, { useState, useEffect, useContext } from 'react';
import { Button, Text, View, Modal, ActivityIndicator, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Location from 'expo-location';
import firebase from 'firebase';
import firebaseInit from '../src/firebaseInit.js';
import {UserInfoContext} from '../src/UserInfoContext';
import {getPreciseDistance, isPointWithinRadius} from 'geolib';
import {pushNearFriends} from '../src/notification';

firebaseInit()

function HomeScreen() {

  const {userInfo} = useContext(UserInfoContext);
  const {uid} = userInfo

  const [modalVisible,setModalVisible] = useState(false);
  const [nearFriendsList, setNearFriendsList] = useState();

  function alertLocation () {

    var nearFriends=[];
    var checkArr=[];
    
  
    firebase.database().ref('location').once('value', (snapshot) => {
   
      const total = Object.values(snapshot.val()).length

      var lati =snapshot.val()[uid]["latitude"]
      var longi =snapshot.val()[uid]["longitude"]
      
      Object.values(snapshot.val()).map((current)=>{
      
      var radiusLocation = isPointWithinRadius(
          { latitude: lati, longitude: longi },
          { latitude: current["latitude"], longitude: current["longitude"] },
          10000
        );
  
  
        if(radiusLocation && (JSON.stringify(uid) !== JSON.stringify(current["uid"]))){
  
          var pdis = getPreciseDistance(
            {latitude: lati, longitude: longi},
            {latitude: current["latitude"], longitude: current["longitude"]},
          );
          
          firebase.database().ref('users/'+current["uid"]).once('value', (snapshot) => {
  
            nearFriends.push({
              name:snapshot.val()["name"],
              uid:snapshot.val()["uid"],
              distance: pdis
            })
            checkArr.push(true)
            if (checkArr.length == total) {
              setNearFriendsList(nearFriends)
              setModalVisible(true)
            }
            
          })
        } else {
          checkArr.push(true)
          if (checkArr.length == total) {
            setNearFriendsList(nearFriends)
            setModalVisible(true)
          }
  
        }
      })
    })
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == 'granted'){
        ()=> Location.requestBackgroundPermissionsAsync()
      }else {
        setErrorMsg('Permission to access location was denied');
        return;
      }

    
    const positionTracking = await Location.watchPositionAsync({accuracy: Location.Accuracy.High, timeInterval: 3000, distanceInterval: 1},(location)=>{
      firebase
      .database()
      .ref('location/'+uid)
      .set({
        latitude:location['coords']['latitude'],
        longitude:location['coords']['longitude'],
        uid:uid
      });
    });
    })();
  },[]);

  return (
    <View style={{ backgroundColor:'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{flex:1, alignContent:'center', justifyContent:'center'}}>
          <View style={{margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000',shadowOffset: {width: 0,height: 2,}}}>
            <Text>
              {nearFriendsList ? nearFriendsList.map((user)=>{
              return `user: ${user["name"]} distance: ${user["distance"]}m\n`}):<ActivityIndicator/>}
            </Text>
            <Button title="Push" onPress={()=>{pushNearFriends(nearFriendsList); setModalVisible(false);}}></Button>
            <Button title="닫기" onPress={()=>setModalVisible(false)}></Button>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={{width:150, height: 150, justifyContent:'center', alignItems:"center", borderRadius: 300}} onPress={()=>{alertLocation();}}>
  
      
      <LottieView source={require('../assets/animation/66818-holographic-radar.json')} autoPlay loop style={{width:500}} />
      {/* <Button title="Location" onPress={()=>{alertLocation();}}/>    */}
      </TouchableOpacity> 
    </View>
  );
}

export default HomeScreen;