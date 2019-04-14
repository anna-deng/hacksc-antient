import React, {Component} from 'react';
import { StyleSheet, View, Alert, Image, Text, TouchableOpacity } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from '../Firebase';

export default class Friends extends React.Component {
  constructor(props) {
    super(props)
  }

  findFriend = () => {
    this.setState({

    })
  }

 render() {
   return (
     <View>
       <TouchableOpacity
        activeOpacity= {0.9}
         style={styles.button}
         onPress={this.findFriend}>
         <View style={styles.circle}></View>
         <View>
          <Text style={styles.name}> {this.props.name} </Text>
          <Text style = {styles.status}> {this.props.status} </Text>
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
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  name:{
    fontSize: 18,
    textAlign:'left',
    fontWeight: 'bold'

  },
  status:{
    fontSize: 15,
    textAlign:'left',
    fontWeight: '200',
    color: 'gray'
  },

  circle: {
    width: 45,
    height: 45,
    borderRadius: 45/2,
    backgroundColor: 'rgba(0,0,0,0.2)',

}
})
