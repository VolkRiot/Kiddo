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

import RegisterApp from '../containers/registerApp';
import NavigationProvider from './Navigator';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <NavigationProvider />;
  }
}
