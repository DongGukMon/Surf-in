import React, {useState, useEffect, useContext} from "react";
import {StyleSheet, Text, View } from "react-native";
import firebase from 'firebase';
import firebaseInit from '../../src/firebaseInit';
import {UserInfoContext} from '../../src/UserInfoContext';


firebaseInit()

function Acount() {

  const {userInfo} = useContext(UserInfoContext);
  const {email, name, uid} = userInfo
  
  const clearLogin = () => {
    firebase.auth().signOut()
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Email: {email}</Text>
      <Text>Name: {name}</Text>
      <Text>Uid: {uid}</Text>
      <Text style={styles.list} onPress={()=>{alert("계정 정보를 설정합니다.")}}>계정설정입니다.</Text>
      <Text style={styles.list} onPress={()=>clearLogin()}>로그아웃</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    fontSize: 18,
    padding:10,
  }
})

export default Acount;

