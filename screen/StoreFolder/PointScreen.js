import React, { useEffect, useState, useContext } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import firebaseInit from '../../src/firebaseInit';
import firebase from 'firebase';
import {UserInfoContext} from '../../src/UserInfoContext';


firebaseInit()



function PointScreen() {

  const [pointData, setPointData] = useState();
  const {userInfo, setUserInfo} = useContext(UserInfoContext);
  const {uid, point} = userInfo



  useEffect(() =>{
    firebase.database().ref('point/' + uid + '/pointLog')
    .once('value', (snapshot) => {
      // console.log(snapshot.val())
      try {
        const pointData = Object.values(snapshot.val());
        setPointData(pointData);
        } catch (error){
          console.log(error)
        } 
      }
    )
  },[])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
      <Text>이렇게 바꾸면?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});


export default PointScreen;