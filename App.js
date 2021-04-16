import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase'
//import firebase from 'firebase/app'
//import 'firebase/auth'
//import 'firebase/firestore'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkaJJfmGQ9shcTtCZiF8-FilNEgKq5-94",
  authDomain: "instagramapp-65d8e.firebaseapp.com",
  projectId: "instagramapp-65d8e",
  storageBucket: "instagramapp-65d8e.appspot.com",
  messagingSenderId: "913946552689",
  appId: "1:913946552689:web:474599726a38a27630eed0",
  measurementId: "G-6MKTS3SZ6Z"
};

//No firebase instance runing
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}


import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'

const Stack = createStackNavigator();


export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn:false,
          loaded:true
        })
      }else {
        this.setState({
          loggedIn:true,
          loaded:true
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded} = this.state
    if(!loaded)
    {
      return(
        <View style={{
          flex:1, justifyContent:'center'
      }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn)
    {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{HeaderShown:false}} />
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return(
      <Provider store={store}>
        <MainScreen />
      </Provider>
      
    )
  }
  
}


export default App;