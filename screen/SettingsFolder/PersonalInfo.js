import React from "react";
import {StyleSheet, Text, View } from "react-native";


function PersonalInfo({ navigation }) {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
        <Text style={styles.list} onPress={()=>{alert("개인정보처리방침입니다.")}}>개인정보처리방침입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    fontSize: 18,
    padding:10,
  }
})

export default PersonalInfo;

