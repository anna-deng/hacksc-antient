import React, {Component} from 'react';
import { StyleSheet, View, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Button, Text, withTheme } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from './Firebase';
import { Directions } from 'react-native-gesture-handler';
import { Header } from 'react-native-elements';
import Friends from './Components/Friends'
import { Location } from 'expo';

export default class Main extends React.Component {


  constructor(props) {
    super(props);
    this._getCoords = this._getCoords.bind(this);

    this.state = {
        position: null,
        mapPressed: false,
        friends: [{
          name: '',
          status: 'test',
          location: {
            latitude:0,
            longitude:0
          }
        }],
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

    this._getCoords();

    const firestore = firebase.firestore();

    Location.watchPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 1000,
      distanceInterval: 50
    }, (location) => {
      firestore.collection("users").doc(this.props.navigation.getParam('uid')).update({
        currentLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          timestamp: location.timestamp
        }
      })   });
    
    


      this.setState({friends:[{name:'Jonathan Dai',status:'main is poppin roll thru',location:{latitude:4,longitude:199}},
  {name:'Anna Deng',status:'at home watching da bachelor',location:{latitude:4,longitude:199}},
  {name:'Float Teephop',status:'finished my hw for the week hang with me',location:{latitude:4,longitude:199}},
  {name:'Drew Parsons',status:'at data viz studio yeet-haw',location:{latitude:4,longitude:199}}]})
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

        </MapView>

        <ScrollView style={this.state.mapPressed ? styles.hiddenFriends : styles.openFriends}>

            {this.state.friends.map(friend => {
          return (
            <Friends
              name={friend.name}
              status={friend.status}
              location={friend.location}
            />
          );
        })}
        </ScrollView>

        <TouchableOpacity
          activeOpacity= {1.0}
          onPress={()=>this.setState({mapPressed:false})}
          style={{textAlignVertical: "center", justifyContent: 'space-around', flexDirection: "row", width: '100%', height: '10%',backgroundColor:'white',position:'absolute',bottom:0,zIndex:3}}>
          {/*pulling facebook profiles*/}
          <Image
          style={{width: 50, height: 50, borderRadius:25, margin: 10}}
          source={{uri: firebase.auth().currentUser.photoURL + "?height=600"}}/>
          <Text style={{margin: 23,flex:1, color: 'black', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 16}}>{firebase.auth().currentUser.displayName}</Text>
          {/*<Button
            onPress={this.firebaseLogout}
            title="Sign Out"/>*/}
          <View style={{margin: 15}}>
            <Button
              size={5}
              onPress={this._getCoords}
              icon={{
                name: "near-me",
                size: 20,
                color: "white",
                zIndex:2,
                bottom: 0,
                right: 0,
              }}/>
          </View>
          </TouchableOpacity>
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
    bottom:'10%',
    zIndex:1,
    backgroundColor: 'rgba(50,50,50,0.9)'},
  openFriends:{
    height:'20%',
    width:'100%',
    position:'absolute',
    bottom:'10%',
    zIndex:1,
    backgroundColor: 'rgba(50,50,50,0.9)'}
});
