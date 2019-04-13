import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from './Firebase';


export default class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      loggingin: false
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button loading={this.state.loggingin} disabled={this.state.loggingin} onPress={this.loginWithFacebook} title="Login with Facebook"/>
      </View>
    );
  }


loginWithFacebook = async () => {

    this.setState({loggingin: true});
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '1033605246838480',
      { permissions: ['public_profile'], behavior: 'native' }
    );
  
    if (type === 'success') {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      //console.log(credential)
      // Sign in with credential from the Facebook user.
      firebase.auth().signInAndRetrieveDataWithCredential(credential).then( (userCredential) => {
        //console.log(userCredential);
        this.props.navigation.navigate('Main');
      });
    }
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })