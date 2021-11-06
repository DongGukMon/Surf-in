import React, {useState, useEffect, useContext} from 'react';
import { ActivityIndicator, Button, Text, View, ScrollView, SafeAreaView, Dimensions, Platform, StyleSheet } from 'react-native';
import {orderContext} from '../../navigators/StackContext';
import {formateDate} from './OrderList';
import Carousel from "../../src/Carousel";

function OrderScreen() {

  const {orderData} = useContext(orderContext);

  const {title,body,regiDate,qrMulti,peopleNumber,uidMulti,complite,reward,timeLimit,img} = orderData.selectData

  var imageList = []
  var addImg = function(){
    if(img){
      imageList = []
      img.map((item,index)=>{
        imageList.push({"url":item['url'],"num":index})
        })
        
      }    
    }()
  const {width: screenWidth} = Dimensions.get('screen');
  const {height: screenHeight} = Dimensions.get('screen');

  
  useEffect(()=>{
    
  
  },[])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={{ flex: 1}}>
        {orderData.selectData ? (
          <View style={{flex:1}}>
            <View style={{height:screenHeight*0.2, marginTop:10 }}>
              <Text style={{...styles.textStyle,fontSize:24}}>{title}</Text>
              <Text style={styles.textStyle}>보상: {reward} Point</Text>
              <Text style={styles.textStyle}>등록일:{regiDate}</Text>
              <Text style={styles.textStyle}>마감일:{new Date(timeLimit).toString()}</Text>
            </View>
            <View style={{height:screenHeight*0.35}}>
            <Carousel
              gap={13}
              offset={13}
              pages={imageList}
              pageWidth={screenWidth - (13 + 13) * 2}
            />
            </View>
            <View>
              <Text style={styles.textStyle}>본문: {body}</Text>
              <Text style={styles.textStyle}>제한인원:{peopleNumber}</Text>
              <Text style={styles.textStyle}>중복참여여부:{uidMulti ? 'True' : "Flase"}</Text>
            </View>
            
          </View>
        ) : <ActivityIndicator/>}
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    textAlign:'center',
    fontSize:17
}
})

export default OrderScreen;