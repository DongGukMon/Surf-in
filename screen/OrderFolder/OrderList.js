import React, {useState, useEffect, useContext} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import firebaseInit from '../../src/firebaseInit';
import firebase from 'firebase';

import {orderContext} from '../../navigators/StackContext';


firebaseInit()


function OrderList({navigation}) {

  const {orderData, setOrderData} = useContext(orderContext);
  const {fullData} = orderData;


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
    <View style={{flex:1, backgroundColor:'white'}}>

        <ScrollView style={{flex:1}}>

          <View style={{flex:1, padding:30}}>

            <View style={{flex:1}}>
              
            </View> 

            <View style={{flex:1}}>
              {fullData ? fullData.map((item, index)=>{

                return (
                <TouchableOpacity style={styles.box} 
    
                    onPress={() => {
                      setOrderData({...orderData, selectData: item})
                      navigation.navigate("OrderScreen")}} key={index}>

                  <Text style={{color:'white'}}>{item["title"]}</Text>
                  <Text style={{color:'white'}}>{item["reward"]}</Text>
                 
                  <Text style={{color:'white'}}>{dateFormate(item['timeLimit'])}</Text>
                </TouchableOpacity>
                )
              }) : <ActivityIndicator/>}
            </View> 

          </View>

        </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center', 
    alignItems: 'center',
    height: 150, 
    borderRadius: 30, 
    marginBottom:15, 
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#4A59EC',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
}
})

export default OrderList;

export function dateFormate(untill) {
  var date = new Date(untill)
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();

  var fullDate= [date.getFullYear(),
              (mm>9 ? '' : '0') + mm,
              (dd>9 ? '' : '0') + dd
            ].join(' / ') + 
            '  ' + 
            [(hour>9 ? '':'0') + hour,
          (minute>9 ? '':'0') + minute].join(' : ');
  return fullDate
}