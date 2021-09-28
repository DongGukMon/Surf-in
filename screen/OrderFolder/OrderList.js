import React, {useState, useEffect, useContext} from 'react';
import { ActivityIndicator, Button, Text, View, ScrollView, TouchableOpacity,SafeAreaView } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import firebaseInit from '../../src/firebaseInit';
import firebase from 'firebase';
import * as Notifications from 'expo-notifications';
import {UserInfoContext} from '../../src/UserInfoContext';
import {orderContext} from '../../navigators/StackContext';

firebaseInit()


function OrderList({navigation}) {

  const {orderData, setOrderData} = useContext(orderContext);
  const {fullData} = orderData;
  const listBox=[];


  useEffect(() => {
    firebase.database().ref("master")
    .on('value', (snapshot) => {
      if(snapshot.val()){
        const data = Object.values(snapshot.val())
        setOrderData({...orderData, fullData: data}) 
        } 
      } 
    )
  },[])

  return (
    <View style={{flex:1 }}>
      <SafeAreaView>
        <ScrollView style={{padding: 30}}>
          {fullData ? fullData.map((item, index)=>{
            
            return (
            <TouchableOpacity style={{backgroundColor: 'white', height: 150, borderRadius: 30, borderColor: 'black', borderWidth:3,justifyContent: 'center', alignItems: 'center'  }} 
                onPress={() => {
                  setOrderData({...orderData, selectData: item})
                  navigation.navigate("OrderScreen")}} key={index}>
              <Text >{item["title"]}</Text>
            </TouchableOpacity>
            )
          }) : <ActivityIndicator/>}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default OrderList;