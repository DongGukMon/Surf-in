import React, { useState, useEffect, useContext} from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as firebase from 'firebase';
import firebaseInit from '../../src/firebaseInit';
import {addPoint} from '../../src/firebaseCall';
import { UserInfoContext } from '../../src/UserInfoContext';
import { useToast } from "react-native-toast-notifications";
import {qrContext} from '../../navigators/StackContext';

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
          navigation.goBack()
          return setModalHandle({...modalHandle,modalVisibleTrade:true,friendUid:value})  
        case "Order":
          return actionOrder(value);
        default:
          alert("올바른 Qr코드를 입력해주세요.")
          setGotError(true);
      }
    } catch(e) {
      console.log(e);
      
    }
  }
    
  const actionOrder = (qrData) => {

    const [orderKey, orderUuid]=qrData.split("/");

    firebase.database().ref('master/'+orderKey).once('value',(snapshot)=> {
    
      //오더의 key가 올바르면 실행
      if(snapshot.val()){
        const orderData = snapshot.val()
        const qrList = []
        Object.values(orderData.qrId).map((item)=>{
          qrList.push(item['uuid'])
        })
        //QR의 uuid가 올바르면 실행
        if(qrList.includes(orderUuid)){

           // 유효기간이 지나지 않았는지
          if (orderData.timeLimit < new Date().getTime()){
            alert("이미 종료된 오더입니다.")
            navigation.goBack()
            return
          }

          //동일한 uuid : uid 로 완료한 기록이 있는지
          if(orderData.complite){
            let breakPoint = false
            if(Object.values(orderData.complite).length >= orderData.peopleNumber){
              alert("인원 마감되었습니다.")
              navigation.goBack()
              return
            } else if(orderData.qrMulti && orderData.uidMulti){
              Object.values(orderData.complite).map((item)=>{
                if(JSON.stringify(item) == JSON.stringify({[orderUuid]:uid})){
                    alert("이미 참여하셨습니다. N:N")
                    breakPoint = true
                    navigation.goBack()
                }
              })
            } else if(orderData.qrMulti && !orderData.uidMulti){
              Object.values(orderData.complite).map((item)=>{
                if(Object.values(item)[0] == uid){
                    alert("이미 참여하셨습니다.N:1")
                    breakPoint = true
                    navigation.goBack()
                }
              })
            } else if(!orderData.qrMulti && orderData.uidMulti){
              Object.values(orderData.complite).map((item)=>{
                if(Object.keys(item)[0] == orderUuid){
                    alert("이미 참여하셨습니다.1:N")
                    breakPoint = true
                    navigation.goBack()
                }
              })
            } else if(!orderData.qrMulti && !orderData.uidMulti){
              Object.values(orderData.complite).map((item)=>{
                if((Object.keys(item)[0] == orderUuid) || (Object.values(item)[0] == uid)){
                    alert("이미 참여하셨습니다.1:1")
                    breakPoint = true
                    navigation.goBack()
                }
              })
            }
            if (breakPoint){
              return
            }
          }
          
          //이상 없었을 때 정상 처리

          //포인트 주기
          firebase.database().ref('point/' + uid).once('value', (snapshot) => {
            const myPoint = snapshot.val().totalPoint;
            addPoint(uid,myPoint,orderData.reward,"Order")
          })

          //완료자 명단
          firebase
            .database()
            .ref('master/'+ orderKey +'/complite')
            .push(
              {[orderUuid]:uid}
            );

          navigation.goBack()
          throwToast("적립 완료!")
        }
        //QR의 uuid가 올바르지 않을때
        else{
          alert("올바르지 않은 QR ID입니다")
          navigation.goBack()
          }
      } 
      //오더 Key가 올바르지 않을때
      else{
        alert("올바르지 않은 오더 입니다")
        navigation.goBack()
        }
    })
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
