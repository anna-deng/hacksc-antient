import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from './Firebase';








export default class App extends React.Component {


  constructor(props) {
    super(props);
    this._getCoords = this._getCoords.bind(this);

    this.state = {
        position: null,
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



    

    
    //this._getCoords();

    ref.on('value', (snapshot) => {
        console.log(snapshot.val());
        this.setState(snapshot.val())
      })
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

  render() {
    return (
     
      <View style={styles.container}>

        <MapView  style={styles.map}
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
      
        
        <View style={{position: 'absolute', bottom: 0, right: 0, margin: 20}}>
          <Button
            
            onPress={this._getCoords}
            icon={{
              name: "near-me",
              size: 40,
              color: "white"
            }}/>
        </View>
      </View>
    );
  }
}

const PictureMarkerView = () => (<View>

</View>)

const styles = StyleSheet.create({
  map: {
    zIndex: -1,
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
});
