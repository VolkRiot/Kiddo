import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import {
  Footer,
  FooterTab,
  Button,
  Container,
  Content,
  Item,
  Input,
  List,
  ListItem
} from 'native-base';
import Dimensions from 'Dimensions';

export default function(props) {
  let shopping = (
    <ListItem key={1}>
      <Text>
        {'No items currently listed'}
      </Text>
    </ListItem>
  );

  if (props.shopping && props.shopping.length > 0) {
    shopping = props.shopping.map((each, i) => {
      return (
        <ListItem key={i}>
          <Text>
            {each}
          </Text>
        </ListItem>
      );
    });
  }

  return (
    <View
      style={{
        flex: 1,
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height
      }}
    >
      <ScrollView>
        <List>
          {shopping}
        </List>
      </ScrollView>
      <View style={{ marginBottom: 8 }}>
        <Item rounded>
          <Input placeholder="What do you need?" />
        </Item>
      </View>
    </View>
  );
}
