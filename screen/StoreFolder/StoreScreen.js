import React, { useEffect, useState, useContext} from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import Timer from '../../src/Timer'
import firebaseInit from '../../src/firebaseInit';
import firebase from 'firebase';
import {UserInfoContext} from '../../src/UserInfoContext';


firebaseInit()

function StoreScreen({navigation}) {

    const [nowTime, setNowTime] = useState(new Date())
    const {userInfo, setUserInfo} = useContext(UserInfoContext);
    const {uid, point} = userInfo

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {point ? (<Text>point: {point}</Text>) : <ActivityIndicator/>}
      <Button
          title="포인트내역"
          onPress={() => navigation.navigate("PointScreen")}
        />
      <Text>Comming Soon</Text>
      <Text><Timer nowDate ={nowTime}/></Text>
    </View>
  );
}

export default StoreScreen;