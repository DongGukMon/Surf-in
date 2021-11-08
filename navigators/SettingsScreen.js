import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Acount from '../screen/SettingsFolder/Acount';
import SettingsRoot from '../screen/SettingsFolder/SettingsRoot';
import Master from '../screen/SettingsFolder/Master';
import PersonalInfo from '../screen/SettingsFolder/PersonalInfo';
import Rules from '../screen/SettingsFolder/Rules';

const Stack = createStackNavigator();

function SettingsScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="SettingRoot" component={SettingsRoot} options={{headerShown: true}} />
        <Stack.Screen name="Master" component={Master} options={{title: 'Master', headerBackTitleVisible:false}}/>
        <Stack.Screen name="PersonalInfo" component={PersonalInfo} options={{title: '개인정보처리방침', headerBackTitleVisible:false}}/>
        <Stack.Screen name="Rules" component={Rules} options={{title: '행동 수칙', headerBackTitleVisible:false}}/>
        <Stack.Screen name="Acount" component={Acount} options={{title: 'Profile', headerBackTitleVisible:false}}/>
    </Stack.Navigator>
  );
}

export default SettingsScreen;