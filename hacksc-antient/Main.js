import React, {Component} from 'react';
import { StyleSheet, View, Alert, Image } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Button, Text, withTheme } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from './Firebase';
import { Directions } from 'react-native-gesture-handler';
import { Header } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-elements';
import Friends from './Components/Friends'

export default class Main extends React.Component {


  constructor(props) {
    super(props);
    this._getCoords = this._getCoords.bind(this);

    this.state = {
        position: null,
        mapPressed: false,
        name: "anna",
        markers: [{
          latlng: {
            latitude: 13.4,
            longitude: 100.2
          },
          title: "Float's Home",
          description: "This is Float's Humble Abode"
        }]

    };
  }

  componentDidMount() {
    ref = firebase.database().ref('hi');

    this._getCoords();

    ref.on('value', (snapshot) => {
        console.log(snapshot.val());
        this.setState(snapshot.val())
      })
  }

  getFriendsList() {

    var friendsList = [];



  }

  getFriendMarkers() {

  }

  firebaseLogout = () => {
    firebase.auth().signOut()
  }

  _getCoords = () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            var initialPosition = JSON.stringify(position.coords);
            this.setState({position: initialPosition});
            let tempCoords = {
                latitude: Number(position.coords.latitude),
                longitude: Number(position.coords.longitude),
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }
            this._map.animateToRegion(tempCoords, 1000);
          }, function (error) { alert(error) },
    );
  };

  _noFriends = () => {
     Alert.alert(
       'chill.',
       'are your current friends not enough?',
       [
         {text: 'sorry', onPress: () => console.log('sorry')},
         {text: 'sorry', onPress: () => console.log('sorry'), style: 'cancel'},
       ],
       { cancelable: false }
     )
   }

  render() {
    return (

      <View style={styles.container}>

      <Header
    leftComponent={{ icon: 'menu', color: '#fff' }}
    centerComponent={{ text: 'Hotspots', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
    rightComponent={<Button
      onPress={this._noFriends}
      title="Add"/>
    }/>

        <MapView onPress={()=>{this.setState({mapPressed:true})}} style={styles.map}
        showsUserLocation
        ref = { map => {this._map = map} }>

          {this.state.markers && this.state.markers.map(marker => (
            <Marker
              coordinate={marker.latlng}
              title={this.state.hello}
              description={marker.description}>
              <Image
          style={{width: 40, height: 40, borderRadius:20, borderColor: 'white', borderWidth: 1}}
          source={{uri: 'https://avatars2.githubusercontent.com/u/8173340?s=400&v=4'}}
        />
              </Marker>
          ))}

          <View style={{position: 'absolute', bottom: -10, right: -10, margin: 0, zIndex:1}}>
            <Button
              onPress={this._getCoords}
              icon={{
                name: "near-me",
                size: 40,
                color: "white",
                zIndex:2
              }}/>
          </View>

        </MapView>

{/*pulling facebook profiles*/}
        <View style={{backgroundColor: 'rgba(50,50,50,0.8)', position: 'absolute', top: 50, width: '95%', padding: 10, borderRadius: 30, alignItems: 'center', opacity: 80, flexDirection: 'row'}}>
          <Image
          style={{width: 80, height: 80, borderRadius:40, margin: 10}}
          source={{uri: firebase.auth().currentUser.photoURL + "?height=600"}}/>
          <View style={{height: '100%', justifyContent: 'space-around', flexShrink: 1}}>
            <Text style={{color: 'white', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 18}}>{firebase.auth().currentUser.displayName}</Text>
          </View>
          <Icon raised name="settings" size="40" color="white" reverse/>
        </View>

        <View style={this.state.mapPressed ? styles.hiddenFriends : styles.openFriends}>
        <Friends name={this.state.name} />
        </View>

        <View style={{width: '100%', height: '10%',backgroundColor:'white',position:'absolute',bottom:0,zIndex:3}}>
        {this.state.mapPressed ? <Button
          onPress={()=>this.setState({mapPressed:false})}
          icon={{
            name: "keyboard_arrow_up",
            size: 40,
            color: "black",
            zIndex: 4
          }}/> : null}

        <View style={{position: 'absolute', bottom: 0, left: 0, margin: 20}}>
          <Button
            onPress={this.firebaseLogout}
            title="Sign Out"/>
        </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    zIndex: -1,
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  hiddenFriends:{
    height:'0%',
    width:'100%',
    position:'absolute',
    bottom:0,
    zIndex:1,
    backgroundColor: 'rgba(50,50,50,0.9)'},
  openFriends:{
    height:'30%',
    width:'100%',
    position:'absolute',
    bottom:0,
    zIndex:1,
    backgroundColor: 'rgba(50,50,50,0.9)'}
});
