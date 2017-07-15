import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

export default class RegisterApp extends Component {

  render() {
    return (
    <View style={styles.container}>
      <TextInput style={styles.input}
        placeholder="Enter an email"
      />
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  input: {
    width: 250,
    height: 50,
    backgroundColor: 'skyblue',
    textAlign: 'center',
    borderRadius: 30
  },
  text: {
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10
  }
});
