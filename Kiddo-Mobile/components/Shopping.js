import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
  Footer,
  FooterTab,
  Button,
  Container,
  Content,
  Card,
  Item,
  Input
} from 'native-base';

export default function(props) {
  let cards = (
    <Card key={1}>
      <Text>
        {'No items currently listed'}
      </Text>
    </Card>
  );

  if (props.shopping && props.events.shopping > 0) {
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
      <Item rounded>
        <Input placeholder="Rounded Textbox" />
      </Item>
    </View>
  );
}
