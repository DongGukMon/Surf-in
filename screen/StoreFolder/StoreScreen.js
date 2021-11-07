import React, { useEffect, useState, useContext} from 'react';
import { ActivityIndicator, StyleSheet, Dimensions, Text, View,TouchableOpacity } from 'react-native';
import Timer from '../../src/Timer'
import firebaseInit from '../../src/firebaseInit';
import firebase from 'firebase';
import {UserInfoContext} from '../../src/UserInfoContext';


firebaseInit()

function StoreScreen({navigation}) {

    const [nowTime, setNowTime] = useState(new Date())
    const {userInfo, setUserInfo} = useContext(UserInfoContext);
    const {uid, point} = userInfo

    const screenHeight = Dimensions.get('screen').height
    const screenWidth = Dimensions.get('screen').width

    useEffect(() =>{
        firebase.database().ref('point/' + uid)
        .on('value', (snapshot) => {
          if(snapshot.val()) {
            const myPoint = snapshot.val().totalPoint;
            setUserInfo({...userInfo, point:myPoint});
            } else {
              alert("DB에 접근할 수 없습니다.") 
          } 
          }
        )
        const timeInterval = setInterval(() => {
            setNowTime(new Date());
          }, 1000);
          
        return ()=> {
          clearInterval(timeInterval)
        }
    },[])
  
  return (
    <View style={{flex:1, backgroundColor:'white' }}>
      <View style={{flexDirection:'row', height:screenHeight*0.2, backgroundColor:'#F4F5F7'}}>
        <View style={{flex:1.5, justifyContent:'center'}}>
          {point ? 
            <Text style={{textAlign:'center', color:'#333FC8', fontSize:30, fontWeight:'bold'}}>
              <Text style={{color:'black'}}>{point}</Text> P
            </Text> : <ActivityIndicator/>}
        </View>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <TouchableOpacity 
            style={{backgroundColor:'tomato', width:100, height:30, borderRadius:15, right:30, justifyContent:'center'}} 
            onPress={()=>{navigation.navigate("PointScreen")}}>
            <Text style={{fontSize:17, fontWeight:'bold', textAlign:'center', color:'white'}}>포인트 내역</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{alignItems:'center', height:screenHeight*0.8}}>
        <View style={{...styles.storeContainer,top:screenHeight*0.075,height:screenHeight*0.5, width:screenWidth*0.8}}>
          <Text style={{fontSize:22, fontWeight:'bold'}}>Count Down</Text>
          <Text style={{fontSize:27, fontWeight:'bold'}}><Timer nowDate = {nowTime} /></Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  storeContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
    height: 150, 
    borderRadius: 30, 
    marginBottom:15, 
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#EDECEE',
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

export default StoreScreen;