import React, { useState, useEffect, useContext } from 'react';
import { Button, Text, View, Modal, ActivityIndicator, TouchableOpacity,Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
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

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  function listRender(item){
    return(
      <View>
        
      </View>
    )
  }

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
          1000
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
        <TouchableOpacity style={{flex:1, alignContent:'center', justifyContent:'center'}} onPressOut={()=>{setModalVisible(false)}}>
          <TouchableWithoutFeedback>
            <View style={styles.modalstyle}>
              <Text style={{fontWeight:'bold', fontSize:14}}>
                {nearFriendsList ? nearFriendsList.map((user)=>{
                return `${user["name"]}   From  ${numberWithCommas(user["distance"])}m\n`}):<ActivityIndicator/>}
              </Text>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={{backgroundColor:'blue', width:60, height:30, borderRadius:15, justifyContent:'center'}} onPress={()=>{pushNearFriends(nearFriendsList); setModalVisible(false);}}>
                  <Text style={{color:'white', fontWeight:'bold', textAlign:'center'}}>Push</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      

        <View style={{position:'absolute', bottom:Dimensions.get('screen').height*0.65}}>
          <Text style={{fontSize:21, textAlign:'center', fontWeight:'bold', color:'#303BA5'}}>1KM 안에 있는 사람들에게</Text>
          <Text style={{fontSize:21, textAlign:'center', fontWeight:'bold', color:'#303BA5'}}>당신을 알려보세요</Text>
        </View>
        
        <TouchableOpacity style={{width:230,height:230,borderRadius:300, top:30}} onPress={()=>{alertLocation();}}>
          <LottieView source={require('../assets/animation/66818-holographic-radar.json')} autoPlay loop style={{width:500, position:'relative', right:45, bottom:45}} />
        </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  modalstyle:{
    margin: 20, 
    backgroundColor: 'white', 
    borderRadius: 20, 
    padding: 35, 
    alignItems: 'center', 
    shadowColor: '#000',
    shadowOffset: {width: 0,height: 2}, 
    borderColor:'blue',
    borderWidth:5
  }
})

export default HomeScreen;