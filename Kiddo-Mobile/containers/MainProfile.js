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
import Map from '../components/MapView';

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
          <Body>
            <Events
              events={
                this.props.kid && this.props.kid.events
                  ? this.props.kid.events
                  : []
              }
            />
          </Body>
        );
      case 'shopping':
        return (
          <Body>
            <Shopping
              events={
                this.props.kid && this.props.kid.shopping
                  ? this.props.kid.shopping
                  : []
              }
            />
          </Body>
        );
      case 'map':
        return <Map location={this.props.location} />;
      default:
        return (
          <Body>
            <Events
              events={
                this.props.kid && this.props.kid.events
                  ? this.props.kid.events
                  : []
              }
            />
          </Body>
        );
    }
  }

  render() {
    return (
      <Container>
        <Header />
        {this.determineView()}
        <Content />
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
    kid: state.kidOwner.kidOwner,
    location: state.location.location
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainProfile);
