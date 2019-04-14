import React, {Component} from 'react';
import { StyleSheet, View, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Button, Text, withTheme } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from './Firebase';
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

    const userFirestoreRef =  firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid || this.props.navigation.getParam('uid'));

    Location.watchPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 1000,
      distanceInterval: 50
    }, (location) => {
    userFirestoreRef.update({
        currentLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          timestamp: location.timestamp
        }
      })   });

      this.getFriendsList();
    
  }



  
  getFriendsList = () => {

    const userFirestoreRef =  firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid || this.props.navigation.getParam('uid'));
    userFirestoreRef.onSnapshot((doc) => {
      //console.log(doc.data())
      doc.data().friends.forEach(friendUID => {
        firebase.firestore().collection("users").doc(friendUID)
          .onSnapshot((doc) => {
            if(doc.data().status.broadcasting == true){
            let friends = {...this.state.friends};
            friends[friendUID] = doc.data();
            this.setState({friends: friends})
          } else if (this.state.friends && friendUID in this.state.friends){
            let friends = {...this.state.friends};
            delete friends[friendUID]
            this.setState({friends: friends})
          }
          })
      });
    });
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
    console.log(this.state)
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

          {this.state.friends && Object.keys(this.state.friends).map(friendUID => {

            friend = this.state.friends[friendUID]
           return (
            <Marker
              coordinate={friend.currentLocation}
              title={friend.name}>
              <Image
          style={{padding:10, width: 40, height: 40, borderRadius:20, borderColor: 'white', borderWidth: 1}}
          source={{uri: friend.photoURL}}
        />
              </Marker>
          )
          
            })}

        </MapView>

        <ScrollView style={this.state.mapPressed ? styles.hiddenFriends : styles.openFriends}>

            {this.state.friends && Object.keys(this.state.friends).map(friendUID => {
              friend = this.state.friends[friendUID]
              
          return (
            <Friends
              name={friend.name}
              status={friend.status.status}
              location={friend.currentLocation}
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
