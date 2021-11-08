import React from "react";
import {StyleSheet, Text, View,Dimensions,Image } from "react-native";


function Master({ navigation }) {

  return (
    <View style={{ flex: 1,backgroundColor:'white' }}>
        
        <View style={{flex:0.5, justifyContent:'flex-end'}}>
          <Text style={styles.list}>그뉵마초맨</Text>
        </View>
        <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
          <View style={{
            height:Dimensions.get('screen').height*0.33, 
            width:Dimensions.get('screen').width*0.85, 
            backgroundColor:'tomato',
            borderRadius:15,
            overflow:'hidden'
            }}>
             <Image
              style={{height:'100%', width:'100%'}}
              source={{
                uri: 'http://img.postshare.co.kr/images/2016/09/20112341/4E65PL1W30ACAE1117M5.jpg',
              }}
            />
          </View>
        </View>
        <View style={{flex:2}}>
          <Text style={{fontSize:20, padding:25}}>그뉵마초맨은 식물을 좋아하고 환경을 사랑하는 착한 소시민이다. 하지만 그를 화나게 해선 안돼.
            환경을 사랑하는 그는 나쁜행동을 가만히 보고만 있지 않아. 그의 말을 잘 들으면 좋은일이 많이 생길지도?
          </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    fontSize: 22,
    textAlign:'center',
    fontWeight:'bold'
  }
})

export default Master;

