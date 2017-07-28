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

export default class Shopping extends Component {
  constructor(props) {
    super(props);
    this.buildList = this.buildList.bind(this);
    this.state = { shopping: props.shopping || [], input: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.buildList({ shopping: nextProps.shopping });
  }

  async handleSubmit(text) {
    // Add to list and post to the child record
    let shopping = this.state.shopping;
    shopping.push(text);

    const success = await this.props.updateKid({ shopping });
    this.setState({ shopping });
  }

  buildList() {
    let shopping = (
      <ListItem key={1}>
        <Text>
          {'No items currently listed'}
        </Text>
      </ListItem>
    );

    if (this.props.shopping && this.props.shopping.length > 0) {
      shopping = this.props.shopping.map((each, i) => {
        return (
          <ListItem key={i}>
            <Text>
              {each}
            </Text>
          </ListItem>
        );
      });
    }
    return shopping;
  }

  render() {
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
            {this.buildList()}
          </List>
        </ScrollView>
        <View style={{ marginBottom: 8 }}>
          <Item rounded>
            <Input
              placeholder="What do you need?"
              onChangeText={input => this.setState({ input })}
              autoFocus={true}
              autoCorrect={false}
              multiline={false}
              onSubmitEditing={event =>
                this.handleSubmit(event.nativeEvent.text)}
            />
          </Item>
        </View>
      </View>
    );
  }
}
