import React, {useState, useEffect, useContext} from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import firebaseInit from '../src/firebaseInit';
import firebase from 'firebase';
import * as Notifications from 'expo-notifications';
import {UserInfoContext} from '../src/UserInfoContext';


firebaseInit()


function OrderScreen() {

  const {userInfo, setUserInfo} = useContext(UserInfoContext);
  const {uid, order, reward} = userInfo;


  useEffect(() => {
    firebase.database().ref("king")
    .on('value', (snapshot) => {
      if(snapshot.val()){
        const NewOrder = snapshot.val().order;
        const NewReward = snapshot.val().reward;
        setUserInfo({...userInfo, order:NewOrder, reward:NewReward}) 
        } else {
          setUserInfo({...userInfo, order:"그냥 노세요"})
        }
      } 
    )
  },[])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {order ? (<Text>{order}</Text>) : <ActivityIndicator/>}
      <Text>{reward}</Text>
      <Text>타이머 들어갈 자리</Text>
    </View>
  );
}

export default OrderScreen;