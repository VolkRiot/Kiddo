import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

export default class RegisterApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: null
    };
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder={'Enter an email'}
            onChangeText={input => this.setState({ input })}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
