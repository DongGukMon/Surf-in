import React, { useState } from "react";
import {StyleSheet, Text, View, Dimensions, TouchableOpacity,SafeAreaView, Button} from "react-native";



function SettingsScreen({ navigation }) {

  const {width: screenWidth} = Dimensions.get('window');
  const {height: screenHeight} = Dimensions.get('window');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container,{width:screenWidth * 0.9, height: screenHeight * 0.8, paddingTop:50}} >
        <View style ={styles.container,{flex:1.2, borderRadius:15, flexDirection:'row', paddingTop:30,paddingLeft:10,paddingRight:10}}>
          
          <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate("Acount")}>
            <Text style={styles.menuTitle}>Acount</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate("Master")}>
          <Text style={styles.menuTitle}>Master</Text>
          </TouchableOpacity>

        </View>

        <View style ={styles.container,{flex:2, borderRadius:15, paddingTop:20, paddingBottom:50}}>

          <TouchableOpacity style={styles.list} onPress={()=>alert("알림설정은 못해")}>
            <Text style={{...styles.menuTitle, color:'tomato'}}>알람</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.list} onPress={()=>navigation.navigate("Rules")}>
            <Text style={{...styles.menuTitle, color:'tomato'}}>행동수칙</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.list} onPress={()=>navigation.navigate("PersonalInfo")}>
            <Text style={{...styles.menuTitle, color:'tomato'}}>개인정보처리방침</Text>
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
    justifyContent:'center',
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
  },
  menuTitle:{
    textAlign:'center', 
    color:'green',
    fontSize:18,
  }
})


export default SettingsScreen;

