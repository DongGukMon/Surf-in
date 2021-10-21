import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import 'react-native-gesture-handler';
import HomeScreen from '../screen/HomeScreen';
import Order from './Order';
import Qr from './Qr'
import SettingsScreen from './SettingsScreen';
import StoreScreen from './Store';
import {Ionicons} from '@expo/vector-icons';
import { LogBox } from 'react-native';


LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const getVisibility = (route) => {
  let routeName = getFocusedRouteNameFromRoute(route);
   if (routeName === 'QrScan') {
      return false;
  }
  return true;
}

const Tab = createBottomTabNavigator();
export default function Main() {
    return (
 <Tab.Navigator
 screenOptions={({ route }) => ({
   tabBarVisible: getVisibility(route),
   tabBarIcon: ({ focused, color, size }) => {
     let iconName;
     if (route.name === 'Home') {
       return(
        <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={focused ? '#333FC8' : "gray"} />
       )
     } else if (route.name === 'Order') {
      return(
      <Ionicons name={focused ? 'mail-open' : 'mail-outline'} size={24} color={focused ? '#333FC8' : "gray"} />
      )

     } else if (route.name === 'Qr') {
      return(
      <Ionicons name={focused ? 'qr-code' : 'qr-code-outline'} size={24} color={focused ? '#333FC8' : "gray"} />
      )
     } else if (route.name === 'Store') {
      return(
      <Ionicons name={focused ? 'shirt' : 'shirt-outline'} size={24} color={focused ? '#333FC8' : "gray"} />
      )
     } else if (route.name === 'Settings') {
      return(
      <Ionicons name={focused ? 'settings' : 'settings-outline'} size={24} color={focused ? '#333FC8' : "gray"} />
      )
     }

   },
 })}

   tabBarOptions={{
     activeTintColor: '#333FC8',
     inactiveTintColor: 'gray',
     activeBackgroundColor:'white',
     inactiveBackgroundColor:'white'
   }}
 >
   <Tab.Screen name="Home" component={HomeScreen} />
   <Tab.Screen name="Order" component={Order} />
   <Tab.Screen name="Qr" component={Qr}/>
   <Tab.Screen name="Store" component={StoreScreen} />
   <Tab.Screen name="Settings" component={SettingsScreen} />
 </Tab.Navigator>
   );
}
