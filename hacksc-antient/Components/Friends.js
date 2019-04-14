import React, {Component} from 'react';
import { StyleSheet, View, Alert, Image, Text, TouchableOpacity } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Friends extends React.Component {
  constructor(props) {
    super(props)
  }

  onPress = () => {
    this.setState({

    })
  }

 render() {
   return (
     <View style={styles.container}>
       <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}>
         <Text style={styles.name}> {this.props.name} </Text>
         <Text> {this.props.status} </Text>
       </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }
})
