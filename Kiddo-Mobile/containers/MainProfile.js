import React, { Component } from 'react';
import { View } from 'react-native';
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
import Events from '../components/Events';
import Shopping from '../components/Shopping';

class MainProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { currentView: 'events' };

    this.changeView = this.changeView.bind(this);
    this.determineView = this.determineView.bind(this);
  }

  changeView(view) {
    this.setState({ currentView: view });
  }

  determineView() {
    switch (this.state.currentView) {
      case 'events':
        return (
          <Events events={this.props.kid.events ? this.props.kid.events : []} />
        );
      case 'shopping':
        return (
          <Shopping
            events={this.props.kid.shopping ? this.props.kid.shopping : []}
          />
        );
      default:
        return (
          <Events events={this.props.kid.events ? this.props.kid.events : []} />
        );
    }
  }

  render() {
    return (
      <Container>
        <Header />
        <Body>
          {this.determineView()}
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
