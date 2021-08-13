import React, { useEffect, useState, useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { LogBox } from 'react-native';
import handleGoogleSignin from '../src/handleGoogleSignin'

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export default function Signin() {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="google Sign in" onPress={()=>handleGoogleSignin()}/>
    </View>
  );
}