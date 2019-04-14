import React, {Component} from 'react';
import { StyleSheet, View, Alert, Image, Text, TouchableOpacity } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from '../Firebase';
import { Location } from 'expo';

export default class Friends extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      city: null
    }
  }

  

  findFriend = () => {
    this.setState({

    })
  }

 render() {

  Location.reverseGeocodeAsync(friend.currentLocation).then((arr) => {
    console.log(arr)
    this.setState({city:`${arr[0].name}, ${arr[0].city}, ${arr[0].region}`})}).catch((e) => console.log(e))

   return (
     <View>
       <TouchableOpacity
        activeOpacity= {0.9}
         style={styles.button}
         onPress={this.findFriend}>
           <Image
          style={{padding:10, width: 40, height: 40, borderRadius:20}}
          source={{uri: friend.photoURL}}
        />
         <View>
          <Text style={styles.name}> {this.props.name} </Text>
          <Text style = {styles.status}> {this.props.status} </Text>
          <Text style = {styles.status}> {this.state.city} </Text>
          </View>

       </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(256,256,256,1.0)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  name:{
    fontSize: 18,
    textAlign:'left',
    fontWeight: 'bold',
    paddingHorizontal: 10
  },
  status:{
    fontSize: 15,
    textAlign:'left',
    fontWeight: '200',
    color: 'gray',
    paddingHorizontal: 10
  },

  circle: {
    width: 45,
    height: 45,
    borderRadius: 45/2,
    backgroundColor: 'rgba(0,0,0,0.2)',

}
})
