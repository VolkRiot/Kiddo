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
  Body,
  Title,
  StyleProvider
} from 'native-base';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dimensions from 'Dimensions';

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

import * as Actions from '../redux/actions';
import NavFooter from '../components/NavFooter';
import Events from '../components/Events';
import Shopping from '../components/Shopping';
import Map from '../components/MapView';

class MainProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { currentView: 'events', kid: props.kid };

    this.changeView = this.changeView.bind(this);
    this.determineView = this.determineView.bind(this);
    this.updateKid = this.updateKid.bind(this);
  }

  changeView(view) {
    this.setState({ currentView: view });
  }

  componentDidMount() {
    this.props.actions.getKidData(this.props.kid);
  }

  async updateKid(obj) {
    const kid = this.props.kid;
    const key = Object.keys(obj)[0];

    kid[key] = obj[key];
    const response = await this.props.actions.updateRecord(kid);
    return response;
  }

  determineView() {
    switch (this.state.currentView) {
      case 'events':
        return (
          <Body
            style={{
              width: Dimensions.get('window').width
            }}
          >
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
              updateKid={this.updateKid}
              shopping={
                this.props.kid && this.props.kid.shopping
                  ? this.props.kid.shopping
                  : []
              }
            />
          </Body>
        );
      case 'map':
        return (
          <Container>
            <Map location={this.props.location} />
            <Content />
          </Container>
        );
      default:
        return (
          <Body
            style={{
              width: Dimensions.get('window').width
            }}
          >
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
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header>
            <Body style={{ alignItems: 'center' }}>
              <Title>
                {this.state.currentView
                  ? this.state.currentView.charAt(0).toUpperCase() +
                    this.state.currentView.slice(1)
                  : ''}
              </Title>
            </Body>
          </Header>
          {this.determineView()}
          <NavFooter
            changeView={this.changeView}
            active={this.state.currentView}
          />
        </Container>
      </StyleProvider>
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
