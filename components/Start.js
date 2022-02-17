import React from "react";
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import BackgroundImage from "../assets/Background-Image.png";

export default class Start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      backDropColor: this.colors.white,
    };
  }
  //--- color palette ---//
  colors = {
    white: "#F6F6F6",
    dark: "#3D3D3D",
    blue: "#9ED8E3",
    purple: "#9C78B0"
  }
  //--- color select function ---//
  colorSelect = (newColor) => {
    this.setState({ backDropColor: newColor })
  }
  //--- render ---//
  render() {
    return (
      <View style={styles.container} >
        <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.image}>

          <Text>Chat App</Text>

          <View style={styles.box1}>

            {/* --- name input box --- */}
            <TextInput
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1
              }}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder="Talk to..."
            />

            {/* ---change color buttons--- */}
            <View style={styles.colorSelector}>
              <TouchableOpacity
                style={styles.greyDot}
                onPress={() => this.colorSelect(this.colors.dark)} />

              <TouchableOpacity
                style={styles.whiteDot}
                onPress={() => this.colorSelect(this.colors.white)} />

              <TouchableOpacity
                style={styles.blueDot}
                onPress={() => this.colorSelect(this.colors.blue)} />

              <TouchableOpacity
                style={styles.purpleDot}
                onPress={() => this.colorSelect(this.colors.purple)} />
            </View>

            {/* --- Go to chat button --- */}
            <Button
              title="Go to Chat"
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  backDropColor: this.state.backDropColor
                })}
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
    justifyContent: 'center',
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
  //--- dot size and color ---//
  dot: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },

  greyDot: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "#3D3D3D"
  },

  whiteDot: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "#F6F6F6"
  },

  blueDot: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "#9ED8E3"
  },

  purpleDot: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "#9C78B0"
  },

  colorSelector: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "flex-start",
    margin: 10
  }
})