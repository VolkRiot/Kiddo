import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator,
  Dimensions
} from 'react-native';

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import SocketIOClient from 'socket.io-client';

import RegisterApp from '../components/registerApp';
import NavigationProvider from './Navigator';

class Main extends Component {
  constructor() {
    super();
  }
  render() {
    return (
        <NavigationProvider />
    );
  }
}



export default Main;
