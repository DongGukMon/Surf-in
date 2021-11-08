import React, {useState, useEffect, useContext} from 'react';
import { ActivityIndicator, Button, Text, View, ScrollView, SafeAreaView, Dimensions, Platform, StyleSheet } from 'react-native';
import {orderContext} from '../../navigators/StackContext';
import {dateFormate, formateDate} from './OrderList';
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
          <View style={{flex:1, alignItems:'center'}}>
            <View style={{height:screenHeight*0.17, marginTop:10 }}>

              <Text style={{...styles.textStyle,fontWeight:'bold', fontSize:24, margin:15, marginBottom:5}}>{title}</Text>
              <Text style={{...styles.textStyle, margin:5}}>{dateFormate(timeLimit)}</Text>
              
              <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                <Text style={styles.textStyle}>{reward} Point</Text>
                <Text style={styles.textStyle}>{complite?Object.keys(complite).length:0} / {peopleNumber} </Text>
              </View>

            </View>

            <View style={{height:screenHeight*0.35}}>
            <Carousel
              gap={13}
              offset={13}
              pages={imageList}
              pageWidth={screenWidth - (13 + 13) * 2}
            />
            </View>

            
            <View style ={{backgroundColor:'green', width:screenWidth*0.85, padding:10, margin:20, borderRadius:15}}>
              <Text style={{...styles.textStyle, color:'white'}}>{body}</Text>
            </View>

            <View style={{}}>
              <Text style={styles.textStyle}>하나의 아이디로 중복 가능여부:{uidMulti ? '  가능' : "  불가능"}</Text>
              <Text style={styles.textStyle}>하나의 QR코드로 중복 가능 여부:{qrMulti ? '  가능' : "  불가능"}</Text>
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