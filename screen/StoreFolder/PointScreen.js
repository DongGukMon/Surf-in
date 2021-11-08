import React, { useEffect, useState, useContext } from 'react';
import {Text, View, StyleSheet, ActivityIndicator, Dimensions, FlatList } from 'react-native';
import firebaseInit from '../../src/firebaseInit';
import firebase from 'firebase';
import {UserInfoContext} from '../../src/UserInfoContext';

firebaseInit()



function PointScreen() {

  const [pointData, setPointData] = useState();
  const {userInfo, setUserInfo} = useContext(UserInfoContext);
  const {uid, point} = userInfo

  const screenHeight = Dimensions.get('screen').height
  const screenWidth = Dimensions.get('screen').width

  function renderItem(item){
    return(
      <View style={{height:screenHeight*0.07, flexDirection:'row', borderBottomWidth:0.5, borderColor:'#E1E2E4'}}>
        <View style={{flex:1, justifyContent:'center'}}>
          <Text style={{fontWeight:'bold', fontSize:18, left:30}}>{item["item"][1].action}</Text>
        </View>
        <View style={{flex:1, justifyContent:'center',}}>
          <Text style={{fontWeight:'bold', fontSize:18, left:30}}>{item["item"][1].changePoint}</Text>
        </View>
      </View>
    )
  }

  useEffect(() =>{
    firebase.database().ref('point/' + uid + '/pointLog')
    .once('value', (snapshot) => {
      // console.log(snapshot.val())
      try {
        const pointData = Object.entries(snapshot.val());
        setPointData(pointData.reverse());
        } catch (error){
          console.log(error)
        } 
      }
    )
  },[])

  return (
    <View style={{ flex: 1, backgroundColor:'white' }}>
      <View style={{height:screenHeight*0.2, backgroundColor:'#F4F5F7', justifyContent:'center', alignItems:'flex-start', borderBottomWidth:3, borderColor:'#333FC8'}}>
        <Text style={{left:30, textAlign:'center', color:'#333FC8', fontSize:30, fontWeight:'bold'}}>
          <Text style={{color:'black'}}>{point}</Text> P
        </Text> 
      </View>
      
      {pointData ? 
        <FlatList
          style={{flex:1, marginTop:30}}
          data={pointData}
          keyExtractor={(item) => item[0]}
          renderItem={renderItem}
        /> : <ActivityIndicator/>}

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