import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { Container, Content, Spinner } from 'native-base';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import SocketIOClient from 'socket.io-client';

import * as Actions from '../redux/actions';
import Router from '../router/Router';

import NavigationProvider from './Navigator';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, found: false };
  }

  async componentDidMount() {
    // TODO: REmove DEBUG Must remove this - Used to clean the Storage
    // await AsyncStorage.clear();
    const found = await this.props.actions.getStoredUser();
    this.setState({ loading: false, found });
  }

  render() {
    if (this.state.loading) {
      return (
        <Container>
          <Content>
            <Spinner color="blue" />
          </Content>
        </Container>
      );
    } else {
      return (
        <NavigationProvider
          startRoute={this.props.mainKid ? 'main' : 'register'}
        />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    mainKid: state.kidOwner.kidOwner
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
