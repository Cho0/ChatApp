import React from "react";
import { View, Text, Button, TextInput, StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBYPPIRZAJ-qe5SJDIeEOMPHL-1br-0L-M",
  authDomain: "chatapp-6e693.firebaseapp.com",
  projectId: "chatapp-6e693",
  storageBucket: "chatapp-6e693.appspot.com",
  messagingSenderId: "897274409738",
  appId: "1:897274409738:web:0ee79962de01d1bbc880f3",
  measurementId: "G-BDJQPW73D4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


this.referenceChatMessages = firebase.firestore().collection('messages');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });

    // displays the user's name on the top of the screen
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    this.setState({
      messages: [
        {
          _id: 2,
          text: name + " has entered the chat",
          createdAt: new Date(),
          system: true,
        },
      ],
    });
    this.referenceChatMessages = firebase.firestore().collection("messages");
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

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      var data = doc.data();
      messages.push({
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