import React from "react";
import {StyleSheet, Text, View } from "react-native";


function Rules({ navigation }) {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.list} onPress={()=>{alert("이것들만 지켜주세요.")}}>행동수칙입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    fontSize: 18,
    padding:10,
  }
})

export default Rules;

