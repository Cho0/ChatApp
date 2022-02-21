import React from "react";
import { View, Text, Button, TextInput, StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    // displays the user's name on the top of the screen
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer!",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: name + " has entered the chat",
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  //--- send messages ---//
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  //--- change text bubble color ---//
  renderBubble(props) {
    return (
      <Bubble{...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  render() {

    //why does backDropColor need {}? it doesnt work without it. But im not sure what the {} do.
    const { backDropColor } = this.props.route.params;

    return (

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: backDropColor
        }}
      >
        <View style={styles.giftedChat}>
          <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}

            user={{
              _id: 1,
            }}
          />
        </View>
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 45,
    color: '#fff'
  },
  giftedChat: {
    flex: 1,
    width: '88%',
    paddingBottom: 30,
  }
})