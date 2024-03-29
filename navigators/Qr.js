import React, { createContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QrScan from '../screen/QrFolder/QrScan';
import QrScreen from '../screen/QrFolder/QrScreen';
import { qrContext } from './StackContext';



const Stack = createStackNavigator();

function Qr() {

  const [modalHandle,setModalHandle] = useState({
    modalVisibleTrade:false,
    text:"",
    isTrade:false,
    friendUid:"",
    porintChangeListen:true
  })

  return (
    <qrContext.Provider value={{modalHandle,setModalHandle}}>
    <Stack.Navigator>
        <Stack.Screen name="QrScreen" component={QrScreen} options={{headerShown: true}}/>
        <Stack.Screen name="QrScan" component={QrScan} options= {{headerTransparent: true, title: '',headerBackTitleVisible:false}}/>
    </Stack.Navigator>
    </qrContext.Provider>
  );
}

export default Qr;