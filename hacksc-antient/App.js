import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
// import the different screens
import Loading from './Loading'
import Login from './Login'
import Main from './Main'
// create our app's navigation stack
const App = createAppContainer(createSwitchNavigator({
  AuthLoading: Loading,
  Main: Main,
  Login: Login
}, {
  initialRouteName: 'AuthLoading',
}))
export default App