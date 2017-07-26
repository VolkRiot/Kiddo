import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text
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
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon ios="cafe" android="cafe" name="event" />
              <Text>Events</Text>
            </Button>
            <Button vertical>
              <Icon ios="ios-menu" android="md-menu" name="menu" />
              <Text>Shopping</Text>
            </Button>
            <Button vertical>
              <Icon name="navigate" />
              <Text>Test</Text>
            </Button>
            <Button vertical>
              <Icon name="navigate" />
              <Text>Test</Text>
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
