import React from "react";
import {StyleSheet, Text, View, Dimensions } from "react-native";

const screenHeight=Dimensions.get('screen').height
const screenWidth=Dimensions.get('screen').width

function Rules({ navigation }) {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
      <View style={{height: screenHeight*0.75, width: screenWidth*0.85, backgroundColor:'#4A59EC', borderRadius:15, justifyContent:'center'}}>
        <Text style={styles.list} onPress={()=>{alert("이것들만 지켜주세요.")}}>1. 푸시 메시지를 적당히 보내자</Text>
        <Text style={styles.list} onPress={()=>{alert("이것들만 지켜주세요.")}}>2. 부당하게 포인트를 얻지 말자</Text>
        <Text style={styles.list} onPress={()=>{alert("이것들만 지켜주세요.")}}>3. 재밌게 놀자~ 뿌우뿌우</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    fontSize: 18,
    padding:10,
    fontWeight:'bold',
    color:'white',
    textAlign:'center'
  }
})

export default Rules;

