import React from "react";
import {StyleSheet, Text, View, Dimensions, TouchableOpacity,SafeAreaView, Button } from "react-native";
import Carousel from "../../src/Carousel";

function PersonalInfo({navigation}) {

  const {width: screenWidth} = Dimensions.get('window');

  const PAGES = [
    {
      num: 1,
      color: '#86E3CE',
    },
    {
      num: 2,
      color: '#D0E6A5',
    },
    {
      num: 3,
      color: '#FFDD94',
    },
    {
      num: 4,
      color: '#FA897B',
    },
    {
      num: 5,
      color: '#CCABD8',
    },
  ];

  return(
    <Carousel
    gap={16}
    offset={16}
    pages={PAGES}
    pageWidth={screenWidth - (16 + 16) * 2}
  />
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