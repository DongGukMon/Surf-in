import React from "react";
import {StyleSheet, Text, View } from "react-native";


function Alam({ navigation }) {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.list} onPress={()=>{alert("좋아요 구독 알림설정까지.")}}>알람설정입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    fontSize: 18,
    padding:10,
  }
})

export default Alam;

