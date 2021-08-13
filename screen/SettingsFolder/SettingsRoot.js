import React, { useState } from "react";
import {StyleSheet, Text, View } from "react-native";



function SettingsScreen({ navigation }) {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.list} onPress={()=>navigation.navigate("Acount")}>계정</Text>
        <Text style={styles.list} onPress={()=>navigation.navigate("Alam")}>알림설정</Text>
        <Text style={styles.list} onPress={()=>navigation.navigate("Rules")}>행동수칙</Text>
        <Text style={styles.list} onPress={()=>navigation.navigate("PersonalInfo")}>개인정보처리방침</Text>
        
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    fontSize: 18,
    padding:10,
  }
})

export default SettingsScreen;

