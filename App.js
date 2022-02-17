import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {

    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Start"
        >
          <Tab.Screen
            name="Start"
            component={Start}
          />
          <Tab.Screen
            name="Chat"
            component={Chat}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
