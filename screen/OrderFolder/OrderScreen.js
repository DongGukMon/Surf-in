import React, {useState, useEffect, useContext} from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import {orderContext} from '../../navigators/StackContext';



function OrderScreen() {

  const {orderData} = useContext(orderContext);
  
  // orderId:"",
  // title:"",
  // body:"",
  // orderCase:"",
  // regiDate:"",
  // peopleNumber:"",
  // qrId:[],
  // reduplication:false,
  // reward:"",
  // timeLimit:""

  const {title,orderId,body,regiData,orderCase,peopleNumber,qrId,reduplication,reward,timeLimit} = orderData.selectData

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {orderData.selectData ? (
        <Text>{title}</Text>
      ) : <ActivityIndicator/>}
    </View>
  );
}

export default OrderScreen;