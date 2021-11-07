import React, {useState, useEffect, useContext} from 'react';
import { Button, Text, View, Modal, Alert, StyleSheet, TouchableHighlight, TextInput, SafeAreaView, Dimensions,Image, ActivityIndicator} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as firebase from 'firebase';
import firebaseInit from '../../src/firebaseInit';
import {UserInfoContext} from '../../src/UserInfoContext';
import { useToast } from "react-native-toast-notifications";
import {qrContext} from '../../navigators/StackContext';
import {addPoint} from '../../src/firebaseCall';
import SwipeUpDown from 'react-native-swipe-up-down';
import FriendCarousel from "../../src/FriendCarousel";

firebaseInit();


function QrScreen({ navigation }) {

  const {modalHandle, setModalHandle} = useContext(qrContext);
  const {modalVisibleTrade,text,isTrade,friendUid,porintChangeListen} = modalHandle;

  const {userInfo} = useContext(UserInfoContext);
  const {uid} = userInfo

  const [swipeUpDownRef, setSwipeUpDownRef] = useState()
  const [carouselData, setCarouselData] = useState([])

  const toast = useToast();

  var tempData = "";

  const {width: screenWidth} = Dimensions.get('window');

  function miniItem(){
    return(
      <View style={{flexDirection:'row', justifyContent:'center'}}>

        <Image
        style={{bottom:10}}
          source={require('../../img/up-arrow.png')}
        />

        <Text style={{textAlign:'center',fontWeight:'bold',color:'#333FC8',bottom:5}}>Camera</Text>

        <Image
        style={{bottom:10}}
          source={require('../../img/up-arrow.png')}
        />
       </View>
    )
  }

  function fullItem(){
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Image
          style={{marginBottom:200}}
          source={require('../../img/diaphragm.png')}
        />
      </View>
    )
  }

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
    navigation.navigate(QrScreen)
    throwToast("거래 완료!");
  }

  useEffect(()=>{
    firebase.database().ref('friends/' + uid).on('value', (snapshot)=>{
      if(snapshot.val()){
      const tempArr=[]
      
      Object.values(snapshot.val()).map((item,index)=>{
        firebase.database().ref('location/'+item).once('value',(location)=>{
          firebase.database().ref('users/'+item).once('value',(users)=>{

            if(Object.values(snapshot.val()).length >tempArr.length){
              
              tempArr.push({
                ...location.val(),
                ...users.val(),
                "num":index
              })
              if(Object.values(snapshot.val()).length == tempArr.length){
                setCarouselData(tempArr)
              }
        }
          })
        })
      })

    } else{
      setCarouselData(["아싸"])
    }
    })
  return() => {
    firebase.database().ref('friends/' + uid).off()
  }
  },[])

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
              setModalHandle({...modalHandle, modalVisibleTrade:false, porintChangeListen:true});
              throwToast("적립 완료!")
              return;
            case "Trade":
              setModalHandle({...modalHandle, modalVisibleTrade:false, isTrade:false, porintChangeListen:true});
              throwToast("거래 완료!")
              return;
            default:
              setModalHandle({...modalHandle, porintChangeListen:true});
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
  },[tempData,porintChangeListen])



  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'white'}}>

        <View style={styles.container,{flex:2, marginBottom:15, marginTop:20,alignItems:'center', justifyContent:'center'}}>
 
          {carouselData ?
          <FriendCarousel
            gap={13}
            offset={10}
            pages={carouselData}
            pageWidth={screenWidth - (10+13) * 2}
          />:<ActivityIndicator/>}
        </View>

        <View style={styles.container,{flex:3.8, backgroundColor:'#99B7E9',borderTopStartRadius:25, borderTopEndRadius:25, paddingTop:10}}>
          <View style={{flex:0.5, alignItems:'center', justifyContent:'center', paddingTop:5, paddingBottom:5}}>    
            {(isTrade) ?
            <Text style={{fontSize:27,fontWeight:'bold',color:'white'}}>Trade</Text> : <Text style={{fontSize:27,fontWeight:'bold',color:'white'}}>Get Friends</Text>
            }
          </View>
          
          <View style={{flex:2, alignItems:'center', justifyContent:'center', marginTop:10,marginBottom:10}}>  
            <Text>
              {(isTrade) ?
              <QRCode value={uid+"&Trade"} size={screenWidth*0.45}/> : <QRCode value={uid+"&Friend"} size={screenWidth*0.45}/>
              }
            </Text>
           </View>
          <View style={{flex:1.5, alignItems:'center',marginTop:20}}> 
            <TouchableHighlight
              style={{ ...styles.openButton,marginTop:10, marginBottom: 10, width:120 }}
              onPress={() => {setModalHandle({...modalHandle, isTrade:!isTrade});}}>
              <Text style={styles.textStyle}>{isTrade ? '친구추가' : '포인트거래'}</Text>
            </TouchableHighlight>
          </View>
        </View>

        <SwipeUpDown 
         itemMini={miniItem()}
         itemFull={fullItem()}
         onShowFull={()=>{
          setModalHandle({...modalHandle, porintChangeListen:false});
          navigation.navigate("QrScan");
          swipeUpDownRef.showMini()}
        }
         disablePressToShow={true} // Press item mini to show full
         style={{ backgroundColor: 'white', borderTopEndRadius: 30, borderTopStartRadius: 30, height:50}} // style for swipe
         hasRef={ref => (setSwipeUpDownRef(ref))}
         swipeHeight={100}
         />

        <Modal
          transparent={true}
          visible={modalVisibleTrade}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
            <View style={{flex:1, justifyContent:'center',alignItems:'center' ,backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
              <View style={styles.modalView}>
                
                <View style={{flex:2, justifyContent:'center'}}>
                <TextInput placeholder="얼마줄거야" value={text} onChangeText={(text)=>{setModalHandle({...modalHandle, text:text})}}/>
                </View>

                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                  <TouchableHighlight 
                  style={{ ...styles.openButton, backgroundColor: '#2196F3', flex:1, marginRight:15 }}
                  onPress={
                    text>0 ? (
                      Number.isInteger(Number(text)) ? (
                        ()=>{           
                        setModalHandle({...modalHandle,modalVisibleTrade:false,isTrade:false,text:"",friendUid:""});
                        actionTrade(friendUid,text)}
                        ) : ()=> {alert("올바른 금액을 입력해주세요")})
                    : ()=>{alert("올바른 금액을 입력해주세요")}}>
                  <Text style={styles.textStyle}>제출</Text>
                  </TouchableHighlight>
                
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: '#2196F3',flex:1, marginLeft:15 }}
                    onPress={() => {
                      setModalHandle({...modalHandle,modalVisibleTrade:false, text:""});
                    }}>
                    <Text style={styles.textStyle}>닫기</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
        </Modal>

      </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
  },
  modalView: {
    flex:0.2,
    margin: 20,
    width:300,
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
    backgroundColor: '#333FC8',
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
  }
});

export default QrScreen;