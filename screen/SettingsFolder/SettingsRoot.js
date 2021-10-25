import React, { useState } from "react";
import {StyleSheet, Text, View, Dimensions, TouchableOpacity,SafeAreaView, Button } from "react-native";



function SettingsScreen({ navigation }) {

  const {width: screenWidth} = Dimensions.get('window');
  const {height: screenHeight} = Dimensions.get('window');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container,{width:screenWidth * 0.9, height: screenHeight * 0.8, paddingTop:50}} >
        <View style ={styles.container,{flex:1.2, borderRadius:15, flexDirection:'row', paddingTop:30,paddingLeft:10,paddingRight:10}}>
          
          <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate("Acount")}>
            <Button style={{flex:1,}} title="Acount" color='green' onPress={()=>navigation.navigate("Acount")}/>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.box} onPress={()=>alert("hi")}>
          <Button style={{flex:1,}} title="Master" color='green' onPress={()=>alert("hi")}/>
          </TouchableOpacity>

        </View>

        <View style ={styles.container,{flex:2, borderRadius:15, paddingTop:20, paddingBottom:50}}>

          <TouchableOpacity style={styles.list} onPress={()=>navigation.navigate("Alam")}>
            <Button style={{flex:1,}} title="알람" color='tomato' onPress={()=>navigation.navigate("Alam")}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.list} onPress={()=>navigation.navigate("Rules")}>
            <Button style={{flex:1,}} title="행동수칙" color='tomato' onPress={()=>navigation.navigate("Rules")}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.list} onPress={()=>navigation.navigate("PersonalInfo")}>
            <Button style={{flex:1,}} title="개인정보처리방침" color='tomato' onPress={()=>navigation.navigate("PersonalInfo")}/>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  box: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    borderRadius:15,
    borderColor:'green',
    borderWidth:2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  list:{
    flex:1,
    margin:10,
    marginHorizontal:17,
    borderRadius:15,
    borderColor:'tomato',
    borderWidth:2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
//         <Text style={styles.list} onPress={()=>navigation.navigate("Acount")}>계정</Text>
//         <Text style={styles.list} onPress={()=>navigation.navigate("Alam")}>알림설정</Text>
//         <Text style={styles.list} onPress={()=>navigation.navigate("Rules")}>행동수칙</Text>
//         <Text style={styles.list} onPress={()=>navigation.navigate("PersonalInfo")}>개인정보처리방침</Text>
        
//     </View>
//   );
// }


export default SettingsScreen;

