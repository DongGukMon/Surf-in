import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrderList from '../screen/OrderFolder/OrderList';
import OrderScreen from '../screen/OrderFolder/OrderScreen';
import { orderContext } from './StackContext';



const Stack = createStackNavigator();

function Order() {

  const [orderData,setOrderData] = useState({
    fullData:[],
    selectData:[]
  })

  return (
    <orderContext.Provider value={{orderData,setOrderData}}>
    <Stack.Navigator>
        <Stack.Screen name="OrderList" component={OrderList} options={{headerShown: true}}/>
        <Stack.Screen name="OrderScreen" component={OrderScreen} options= {{headerTransparent: false, title:orderData.selectData.title, headerBackTitleVisible:false}}/>
    </Stack.Navigator>
    </orderContext.Provider>
  );
}

export default Order;