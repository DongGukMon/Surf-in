import React, {useState, useEffect, useContext} from 'react';
import { ActivityIndicator, Button, Text, View, ScrollView, SafeAreaView, Dimensions, Platform, StyleSheet } from 'react-native';
import {orderContext} from '../../navigators/StackContext';
import {formateDate} from './OrderList';


function OrderScreen() {

  const {orderData} = useContext(orderContext);

  const {title,body,regiDate,qrMulti,peopleNumber,uidMulti,complite,reward,timeLimit,img} = orderData.selectData

  var imageList = []
  var addImg = function(){
    if(img){
      imageList = []
      img.map((item)=>{
        imageList.push(item['url'])
        })
        
      }    
    }()
  const {width: screenWidth} = Dimensions.get('window');
    
  useEffect(()=>{
    
  
  },[])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={{ flex: 1}}>
        {orderData.selectData ? (
          <View style={{flex: 1}}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'green' }}>
              <Text>title:{title}</Text>
              <Text>reward:{reward}</Text>
              <Text>등록일:{regiDate}</Text>
              <Text>마감일:{new Date(timeLimit).toString()}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'tomato' }}>

            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow'}}>
              <Text>본문{body}</Text>
              <Text>제한인원:{peopleNumber}</Text>
              <Text>중복참여여부:{uidMulti ? 'True' : "Flase"}</Text>
            </View>
            
          </View>
        ) : <ActivityIndicator/>}
        </ScrollView>
    </SafeAreaView>
  );
}

export default OrderScreen;