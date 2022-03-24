import React from "react";
import { View, Text, Button, TextInput, StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBYPPIRZAJ-qe5SJDIeEOMPHL-1br-0L-M",
  authDomain: "chatapp-6e693.firebaseapp.com",
  projectId: "chatapp-6e693",
  storageBucket: "chatapp-6e693.appspot.com",
  messagingSenderId: "897274409738",
  appId: "1:897274409738:web:0ee79962de01d1bbc880f3",
  measurementId: "G-BDJQPW73D4"
};

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
      isConnected: false,
      image: null,
      location: null,
    };
    //initializing firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    // reference to the Firestore messages collection
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.refMsgsUser = null;
  }

  componentDidMount() {
    // displays the user's name on the top of the screen
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    // listen to authentication events
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }

      // update user state with currently active data
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
          avatar: 'https://placeimg.com/140/140/any',
        },
      });
      // listens for updates in the collection
      this.unsubscribe = this.referenceChatMessages
        .orderBy('createdAt', 'desc')
        .onSnapshot(this.onCollectionUpdate);
      //referencing messages of current user
      this.refMsgsUser = firebase
        .firestore()
        .collection('messages')
        .where('uid', '==', this.state.uid);
    });
  }


  //--- send messages ---//
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  //--- add messages ---//
  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: this.state.user,
    });
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

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      var data = doc.data();
      messages.push({
        uid: user.uid,
        user: data.user,
        text: data.text,
        createdAt: data.createdAt.toDate(),
      });
    });
    this.setState({
      messages: messages,
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
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
            addMessage={message => this.addMessage(message)}


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