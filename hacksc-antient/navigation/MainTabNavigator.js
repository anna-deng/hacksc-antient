import {createStackNavigator, createAppContainer} from 'react-navigation';
import LoginScreen from "../Screens/Login.js";
import MapScreen from "../Screens/Map.js";

export default createStackNavigator({
  Login: {screen: LoginScreen},
  Map: {screen: MapScreen},
},
  {
    initialRouteName: "Login"
  });
