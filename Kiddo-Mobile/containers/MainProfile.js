import React, { Component } from 'react';
import { View } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Icon,
  Body
} from 'native-base';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../redux/actions';

class MainProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header />
        <Body />
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon ios="ios-calendar" android="md-calendar" />
              <Text>Events</Text>
            </Button>
            <Button vertical>
              <Icon ios="ios-basket-outline" android="md-basket-outline" />
              <Text>Shopping</Text>
            </Button>
            <Button vertical>
              <Icon ios="ios-map" android="md-map" />
              <Text>Map</Text>
            </Button>
            <Button vertical>
              <Icon
                ios="ios-chatbubbles-outline"
                android="md-chatbubbles-outline"
              />
              <Text>Chat</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    kid: state.kidOwner
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainProfile);
