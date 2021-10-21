import React, { useEffect, useState, useContext } from 'react';
import { Button, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { LogBox } from 'react-native';
import handleGoogleSignin from '../src/handleGoogleSignin'

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export default function Signin() {

  return (
    <View style={{ flex: 1}}>
      <ImageBackground source={require('../img/login_img.png')} resizeMode="cover" style={{flex: 1, justifyContent: 'center'}}>
      <View style={{flex:1.5}}/>
        <TouchableOpacity onPress={()=>handleGoogleSignin()} style={{flex:0.5, justifyContent: 'center', alignItems:'center'}}>
          <Image source={require('../img/signin.png')} style={{}} />
        </TouchableOpacity>
        <View style={{flex:3.5}}/>
      </ImageBackground>
    </View>
  );
}