import React, {useState, useEffect, useContext} from "react";
import {StyleSheet, Text, View, Dimensions,TouchableOpacity } from "react-native";
import firebase from 'firebase';
import firebaseInit from '../../src/firebaseInit';
import {UserInfoContext} from '../../src/UserInfoContext';


firebaseInit()

const screenHeight=Dimensions.get('screen').height
const screenWidth=Dimensions.get('screen').width

function Acount() {

  const {userInfo} = useContext(UserInfoContext);
  const {email, name, uid} = userInfo
  
  const clearLogin = () => {
    firebase.auth().signOut()
  };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
//       <Text>Email: {email}</Text>
//       <Text>Name: {name}</Text>
//       <Text>Uid: {uid}</Text>
//       <Text style={styles.list} onPress={()=>{alert("계정 정보를 설정합니다.")}}>계정설정입니다.</Text>
//       <Text style={styles.list} onPress={()=>clearLogin()}>로그아웃</Text>
//     </View>
//   );
// }

return (
  <View style={{ flex: 1, backgroundColor:'white' }}>
    
    <View style={{flex:3, justifyContent:'center', alignItems:'center', marginTop:25}}>
      <View style={{height:screenHeight*0.25, width:screenWidth*0.85, backgroundColor:'tomato', justifyContent:'center', borderRadius:20}}>
        <Text style={{textAlign:'center', color:'white', fontWeight:'bold', fontSize:27}}>Membership Card</Text>
      </View>
    </View>

    <View style={{flex:2.5, justifyContent:'center',alignItems:'center'}}>
      <View style={{width:screenWidth*0.85, padding:20, borderBottomWidth:3, borderTopColor:'gray', borderBottomColor:'gray', borderTopWidth:3}}>
        <Text style={styles.list}>{email}</Text>
        <Text style={styles.list}>{name}</Text>
      </View>
    </View>
    
    <View style={{flex:2,justifyContent:'center', alignItems:'center'}}>
      <View style={{width:screenWidth*0.85}}>
        <Text style={{textAlign:'center', fontSize:18}} onPress={()=>{alert("계정 정보를 설정합니다.")}}>계정설정입니다.</Text>
      </View>
    </View>
    <View style={{flex:1, justifyContent:'flex-end', alignItems:'flex-end'}}>
      <TouchableOpacity style={{position:'relative', bottom:10, right:7, backgroundColor:'pink', borderRadius:5}} onPress={()=>{clearLogin()}}>
        <Text style={styles.list}>로그아웃</Text>
      </TouchableOpacity>    
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  list: {
    fontSize: 18,
    padding:5,
  }
})

export default Acount;

