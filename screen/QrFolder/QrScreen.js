import React, {useState, useEffect, useContext} from 'react';
import { Button, Text, View, Modal, Alert, StyleSheet, TouchableHighlight, TextInput} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as firebase from 'firebase';
import firebaseInit from '../../src/firebaseInit';
import {UserInfoContext} from '../../src/UserInfoContext';
import { useToast } from "react-native-toast-notifications";
import {qrContext} from '../../navigators/qrContext';
import {addPoint} from '../../src/firebaseCall';


firebaseInit();


function QrScreen({ navigation }) {

  const {modalHandle, setModalHandle} = useContext(qrContext);
  const {modalVisibleQr,modalVisibleTrade,text,isTrade,friendUid,porintChangeListen} = modalHandle;

  const {userInfo} = useContext(UserInfoContext);
  const {uid} = userInfo

  const toast = useToast();

  var tempData = "";

  function throwToast(massage){
    toast.show(massage,{
      type: "success",
      duration: 4000,
      offset: 30,
      animationType: "slide-in",
    });
  }

  const actionTrade = (friendUid, amount) => {
    
    firebase.database().ref('point/' + friendUid).once('value', (snapshot) => {
      const friendPoint = snapshot.val().totalPoint;
      addPoint(friendUid,friendPoint,amount,"Trade")
    })
    firebase.database().ref('point/' + uid).once('value', (snapshot) => {
      const myPoint = snapshot.val().totalPoint;
      addPoint(uid,myPoint,-amount,"Trade")
    })
    navigation.goBack()
    throwToast("거래 완료!");
  }


  useEffect(() =>{
    firebase.database().ref('point/' + uid + '/pointLog')
    .on('value', (snapshot) => {
      try {
        if (!tempData){
          tempData = snapshot.val()
        }

        if(porintChangeListen && (JSON.stringify(snapshot.val()) !== JSON.stringify(tempData))){
          
          tempData = snapshot.val()
          var recentChange = Object.values(snapshot.val())
          var recentChange = recentChange[recentChange.length-1]
      
          switch (recentChange.action){
            case "Friend":
              setModalHandle({...modalHandle, modalVisibleTrade:false,modalVisibleQr:false, porintChangeListen:false});
              throwToast("적립 완료!")
              return;
            case "Trade":
              setModalHandle({...modalHandle, modalVisibleTrade:false,modalVisibleQr:false, isTrade:false, porintChangeListen:false});
              throwToast("거래 완료!")
              return;
            default:
              setModalHandle({...modalHandle, porintChangeListen:false});
              alert(recentChange.action);
          }
      }
        } catch (error){
          console.log(error)
        } 
      }
    )
  return () => {
    firebase.database().ref('point/' + uid + '/pointLog').off()
  };
  },[modalVisibleQr,tempData,porintChangeListen])

    
  return (
    
    <View style = {styles.centeredView}>

      <Modal
        transparent={true}
        visible={modalVisibleQr}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>
              {(isTrade) ? 
              <QRCode value={uid+"&Trade"} size={170}/> : <QRCode value={uid+"&Friend"} size={170}/>
              };
            </Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3', marginTop: 17, marginBottom: -10 }}
              onPress={() => {setModalHandle({...modalHandle,modalVisibleQr:false, isTrade:false});}}>
              <Text style={styles.textStyle}>닫기</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

          <Modal
            transparent={true}
            visible={modalVisibleTrade}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TextInput placeholder="얼마줄거야" value={text} onChangeText={(text)=>{setModalHandle({...modalHandle, text:text})}}/>
                  <Button title ="제출" onPress={text>0 ? ()=>{
                    setModalHandle({...modalHandle,modalVisibleTrade:false,isTrade:false,text:"",friendUid:""});
                    actionTrade(friendUid,text)
                  }
                    : ()=>{alert("올바른 금액을 입력해주세요")}}/>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: '#2196F3', marginTop: 17, marginBottom: -10 }}
                    onPress={() => {
                      setModalHandle({...modalHandle,modalVisibleTrade:false, text:""});
                    }}>
                    <Text style={styles.textStyle}>닫기</Text>
                  </TouchableHighlight>
                </View>
              </View>
          </Modal>

        <View style={styles.centeredView}>
        <Button title="Get Friends" onPress={()=>{setModalHandle({...modalHandle, modalVisibleQr:true, isTrade:false, porintChangeListen:true})}}></Button>
        <Button title="Trade Point" onPress={()=>{setModalHandle({...modalHandle, modalVisibleQr:true, isTrade:true, porintChangeListen:true })}}></Button>
        <Button
          title="Scan"
          onPress={() => {
            setModalHandle({...modalHandle, porintChangeListen:false});
            navigation.navigate("QrScan");
          }}
        />
        </View>
  </View>
  
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 80
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    paddingHorizontal: 20
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default QrScreen;