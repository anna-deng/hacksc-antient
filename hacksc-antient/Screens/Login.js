import React from "react";
import {Text, View, StyleSheet} from "react-native";
import { Button } from "react-native-elements";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
        const {navigate} = this.props.navigation;
    return (
      <View>
        <Text>test</Text>
        <Button
        title="Login"
        onPress={() => navigate('Map', {name: 'Jane'})}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#DDDDFF",
    flex: 1
  }
});
