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
       iconName = focused
         ? 'home'
         : 'home-outline';
     } else if (route.name === 'Order') {
       iconName = focused ? 'mail-open' : 'mail-outline';
     } else if (route.name === 'Qr') {
       iconName = focused ? 'qr-code' : 'qr-code-outline';
     } else if (route.name === 'Store') {
       iconName = focused ? 'shirt' : 'shirt-outline';
     } else if (route.name === 'Settings') {
       iconName = focused ? 'settings' : 'settings-outline';
     }

     // You can return any component that you like here!
     return <Ionicons name={iconName} size={24} color="black" />;
   },
 })}

   tabBarOptions={{
     activeTintColor: 'tomato',
     inactiveTintColor: 'gray',
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
