import React from "react";
import {StyleSheet, Text, View, Dimensions, TouchableOpacity,SafeAreaView, Button } from "react-native";
import Carousel from "../../src/Carousel";

function PersonalInfo({navigation}) {

  const {width: screenWidth} = Dimensions.get('window');

  return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text onPress={()=>alert("하지만 아무것도 없지. 관련 내용 서치를 아직 안했거든.")}>여기는 개인정보처리방침</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor:'white'
  }
})

export default PersonalInfo;