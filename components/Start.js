import React from "react";
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, TouchableHighlight, Dimensions } from 'react-native';
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import BackgroundImage from "../assets/Background-Image.png";
export default class Start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      backDropColor: this.colorSelect.white,
    };
  }

  colors = {
    white: "#F6F6F6",
    dark: "#3D3D3D",
    blue: "#9ED8E3",
    purple: "#9C78B0"
  }

  colorSelect = (newColor) => {
    setState({ backDropColor: newColor })
  }
  render() {
    return (
      <View style={styles.container} >
        <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.image}>
          <Text>Hello Screen1!</Text>
          <View style={styles.box1}>
            <TextInput
              style={styles.yourName}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder="Type Here ..."
            />
            <View>
              <TouchableHighlight
                style={styles.dot}
              />


            </View>
            <Button
              title="Go to Chat"
              onPress={() =>
                this.props.navigation.navigate("Chat", { name: this.state.name })}
            />
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "center"
  },
  box1: {
    height: "44%",
    width: "88%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  yourName: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
  dot: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    backgroundColor: "#3D3D3D",
  },



})