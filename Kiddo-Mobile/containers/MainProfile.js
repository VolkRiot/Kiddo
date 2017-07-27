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
  Body
} from 'native-base';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../redux/actions';
import NavFooter from '../components/NavFooter';

class MainProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { currentView: 'events' };

    this.changeView = this.changeView.bind(this);
  }

  changeView(view) {
    this.setState({ currentView: view });
  }

  render() {
    return (
      <Container>
        <Header />
        <Body>
          <Text>
            {JSON.stringify(this.props.kid.events)}
          </Text>
        </Body>
        <NavFooter
          changeView={this.changeView}
          active={this.state.currentView}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    kid: state.kidOwner.kidOwner
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainProfile);
