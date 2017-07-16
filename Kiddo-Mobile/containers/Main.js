import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import RegisterApp from '../components/registerApp';

// import Proptypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import SocketIOClient from 'socket.io-client';

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
    justifyContent: 'center'
  }
});

export default Main;
