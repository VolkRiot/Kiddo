import React, { Component } from 'react';
import { Text } from 'react-native';
import {
  Footer,
  FooterTab,
  Button,
  Icon,
  Container,
  Content,
  Spinner
} from 'native-base';

export default function(props) {
  return (
    <Footer>
      <FooterTab>
        <Button
          vertical
          active={props.active === 'events'}
          onPress={props.changeView.bind(null, 'events')}
        >
          <Icon ios="ios-calendar" android="md-calendar" />
          <Text>Events</Text>
        </Button>
        <Button
          vertical
          active={props.active === 'shopping'}
          onPress={props.changeView.bind(null, 'shopping')}
        >
          <Icon ios="ios-basket-outline" android="md-basket-outline" />
          <Text>Shopping</Text>
        </Button>
        <Button
          vertical
          active={props.active === 'map'}
          onPress={props.changeView.bind(null, 'map')}
        >
          <Icon ios="ios-map" android="md-map" />
          <Text>Map</Text>
        </Button>
        {/* <Button
          vertical
          active={props.active === 'chat'}
          onPress={props.changeView.bind(null, 'chat')}
        >
          <Icon
            ios="ios-chatbubbles-outline"
            android="md-chatbubbles-outline"
          />
          <Text>Chat</Text>
        </Button> */}
      </FooterTab>
    </Footer>
  );
}
