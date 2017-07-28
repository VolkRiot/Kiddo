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
import Dimensions from 'Dimensions';

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
    <View
      style={{
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height / 4
      }}
    >
      {cards}
    </View>
  );
}
