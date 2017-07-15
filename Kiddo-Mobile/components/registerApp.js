import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class RegisterApp extends Component {

  render() {
    return (
    <View style={styles.container}>
        <Text style={styles.text}>Input an email</Text>
      <View style={styles.input} />
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
    width: 200,
    height: 50,
    backgroundColor: 'skyblue',
    borderRadius: 30
  },
  text: {
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10
  }
});
