import React, { createContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QrScan from '../screen/QrFolder/QrScan';
import QrScreen from '../screen/QrFolder/QrScreen';
import { qrContext } from './StackContext';



const Stack = createStackNavigator();

function Qr() {

  const [modalHandle,setModalHandle] = useState({
    modalVisibleQr: false,
    modalVisibleTrade:false,
    text:"",
    isTrade:false,
    friendUid:"",
    porintChangeListen:false
  })

  return (
    <qrContext.Provider value={{modalHandle,setModalHandle}}>
    <Stack.Navigator>
        <Stack.Screen name="QrScreen" component={QrScreen} options={{headerShown: false}}/>
        <Stack.Screen name="QrScan" component={QrScan} options= {{headerTransparent: true, title: '',headerBackTitleVisible:false}}/>
    </Stack.Navigator>
    </qrContext.Provider>
  );
}

export default Qr;