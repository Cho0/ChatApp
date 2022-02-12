import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

export default class Chat extends React.Component {
  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    //why does backDropColor need {}? it doesnt work without it. But im not sure what the {} do.
    const { backDropColor } = this.props.route.params;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: backDropColor
        }}>

      </View>
    )
  }
}