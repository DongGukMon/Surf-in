import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StoreScreen from '../screen/StoreFolder/StoreScreen';
import PointScreen from '../screen/StoreFolder/PointScreen';

const Stack = createStackNavigator();

function Qr() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="StoreScreen" component={StoreScreen} options={{headerShown: true}} />
        <Stack.Screen name="PointScreen" component={PointScreen}/>
    </Stack.Navigator>
  );
}

export default Qr;