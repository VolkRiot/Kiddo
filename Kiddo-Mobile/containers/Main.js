import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RegisterApp from '../components/registerApp';

class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RegisterApp />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main
