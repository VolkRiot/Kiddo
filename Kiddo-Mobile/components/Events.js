import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
  Footer,
  FooterTab,
  Button,
  Container,
  Content,
  Card
} from 'native-base';

export default function(props) {
  let cards = (
    <Card key={1}>
      <Text>
        {'No events currently scheduled'}
      </Text>
    </Card>
  );

  if (props.events && props.events.length > 0) {
    cards = props.events.map((each, i) => {
      return (
        <Card key={i}>
          <Text>
            {each.title}
          </Text>
        </Card>
      );
    });
  }

  return (
    <View>
      {cards}
    </View>
  );
}
