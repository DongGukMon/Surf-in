import React, { useState, useEffect, useContext} from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as firebase from 'firebase';
import firebaseInit from '../../src/firebaseInit';
import {addPoint} from '../../src/firebaseCall';
import { UserInfoContext } from '../../src/UserInfoContext';
import { useToast } from "react-native-toast-notifications";
import {qrContext} from '../../navigators/qrContext';

firebaseInit()


export default function QrScan({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [gotError, setGotError] = useState(false);
  const {userInfo} = useContext(UserInfoContext);
  const {uid} = userInfo;

  const toast = useToast();

  const {modalHandle, setModalHandle} = useContext(qrContext);

  function throwToast(massage){
    toast.show(massage,{
      type: "success",
      duration: 4000,
      offset: 30,
      animationType: "slide-in",
    });
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = (data) => {
    setScanned(true);
    try {
      const [value, action]=data['data'].split("&");
      switch (action){
        case "Friend":
          return actionFriends(value);
        case "Trade":
          // return actionTrade(friendUid,amount,action);
          navigation.goBack()
          return setModalHandle({...modalHandle,modalVisibleTrade:true,friendUid:value})  
          default:
          alert("올바른 Qr코드를 입력해주세요.")
          setGotError(true);
      }
    } catch(e) {
      console.log(e);
      
    }
  }
    
  const actionFriends = (friendUid) => {
    firebase.database().ref('friends/' + uid).once('value', (snapshot) => {
      const friendsList = snapshot.val() ? Object.values(snapshot.val()) : [];
     if(friendsList.includes(friendUid)){
         navigation.goBack()
         alert("이미 등록된 친구입니다.")
       } else{
        firebase.database().ref('point/' + friendUid).once('value', (snapshot) => {
          const friendPoint = snapshot.val().totalPoint;
          addPoint(friendUid,friendPoint,100,"Friend")
        })
        firebase.database().ref('point/' + uid).once('value', (snapshot) => {
          const myPoint = snapshot.val().totalPoint;
          addPoint(uid,myPoint,100,"Friend")
        })
        firebase
        .database()
        .ref('friends')
        .child(uid)
        .push(
          friendUid
          );
        firebase
        .database()
        .ref('friends')
        .child(friendUid)
        .push(
          uid
        );
    
        navigation.goBack()
        throwToast("적립 완료!")
       }
     })
  }

  // const actionTrade = (friendUid, amount, action) => {
    
  //   firebase.database().ref('point/' + friendUid).once('value', (snapshot) => {
  //     const friendPoint = snapshot.val().totalPoint;
  //     addPoint(friendUid,friendPoint,-amount,action)
  //   })
  //   firebase.database().ref('point/' + uid).once('value', (snapshot) => {
  //     const myPoint = snapshot.val().totalPoint;
  //     addPoint(uid,myPoint,amount,action)
  //   })
  //   navigation.goBack()
  //   toast.show("거래 완료!",{
  //     type: "success",
  //     duration: 4000,
  //     offset: 30,
  //     animationType: "slide-in",
  //   });
  // }


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {gotError && <Button title={'Tap to Scan Again'} onPress={() => {setScanned(false); setGotError(false)}} />}
      {(scanned && !gotError) && <ActivityIndicator/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
