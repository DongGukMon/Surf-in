import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Acount from '../screen/SettingsFolder/Acount';
import SettingsRoot from '../screen/SettingsFolder/SettingsRoot';
import Alam from '../screen/SettingsFolder/Alam';
import PersonalInfo from '../screen/SettingsFolder/PersonalInfo';
import Rules from '../screen/SettingsFolder/Rules';

const Stack = createStackNavigator();

function SettingsScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="SettingRoot" component={SettingsRoot} options={{headerShown: true}} />
        <Stack.Screen name="Alam" component={Alam}/>
        <Stack.Screen name="PersonalInfo" component={PersonalInfo} options={{title: '',headerBackTitleVisible:false}}/>
        <Stack.Screen name="Rules" component={Rules}/>
        <Stack.Screen name="Acount" component={Acount}/>
    </Stack.Navigator>
  );
}

export default SettingsScreen;