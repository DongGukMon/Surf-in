import React,{useState, useEffect, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Main from './navigators/Main';
import Signin from './screen/Signin';
import { ActivityIndicator, LogBox, View,Text } from 'react-native';
import firebase from 'firebase';
import {UserInfoContext} from './src/UserInfoContext'; 
import { ToastProvider } from 'react-native-toast-notifications'

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export default function App() {

  const [isLogin, setIsLogin] = useState("Yet");
  const [userInfo, setUserInfo] = useState({uid: "",email:"",name: "",point: ""});

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function(result) {
          if(result) {
          setUserInfo({...userInfo,uid:result.uid, email:result.email, name: result.displayName})
          }
          setIsLogin(result)
        }
    )
  };

  useEffect(() => {
    checkIfLoggedIn()
  },[])

  

  return (
    isLogin == "Yet" ?
      (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator/></View>) :
    (isLogin ?(
      <UserInfoContext.Provider value={{userInfo,setUserInfo}}>
        <ToastProvider>
        <NavigationContainer>
          <Main/>
        </NavigationContainer>
        </ToastProvider>
      </UserInfoContext.Provider>
    ) : 
      <UserInfoContext.Provider value={{userInfo,setUserInfo}}>
        <Signin/>
      </UserInfoContext.Provider>
    )
  )
}
