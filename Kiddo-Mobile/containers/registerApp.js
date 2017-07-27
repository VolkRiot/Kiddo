import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableHighlight
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  StyleProvider
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Theme
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

import * as Actions from '../redux/actions';

import Router from '../router/Router';

class RegisterApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: null,
      passwordInput: null,
      selectedKid: null,
      selectedKidIndex: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.kidChoices = this.kidChoices.bind(this);
    this.unregisteredView = this.unregisteredView.bind(this);
    this.focusAvatar = this.focusAvatar.bind(this);
  }

  handleSubmit(text) {
    this.props.actions.findParentbyEmail(text);
    // Turns red then resets the red color
    setTimeout(() => {
      this.props.actions.resetSearchTerm();
    }, 1500);
  }

  unregisteredView() {
    return (
      <View style={styles.container}>
        <TextInput
          style={
            this.props.user.searchSubmitted && !this.props.user.found
              ? styles.inputNotFound
              : styles.input
          }
          placeholder={'Enter an email'}
          autoFocus={true}
          autoCorrect={false}
          keyboardType={'email-address'}
          onChangeText={input => this.setState({ input })}
          multiline={false}
          onSubmitEditing={event => this.handleSubmit(event.nativeEvent.text)}
        />
      </View>
    );
  }

  focusAvatar(each, i) {
    this.setState({ selectedKid: each, selectedKidIndex: i });
  }

  handleSubmitPassword(password) {
    if (
      this.state.selectedKid &&
      this.state.selectedKid.password === password
    ) {
      // Create Action to Register kid to App then redirect to main view
      this.props.actions.saveKidAsUser(this.state.selectedKid);
      this.props.navigator.push('main');
    }
  }

  kidChoices() {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
          }}
        >
          {this.props.kids.map((each, i) => {
            return (
              <TouchableHighlight
                onPress={this.focusAvatar.bind(this, each, i)}
                style={styles.child_img}
                key={i}
              >
                <Image
                  style={
                    this.state.selectedKidIndex === i
                      ? styles.child_selected
                      : styles.child_img
                  }
                  key={i}
                  source={{ uri: each.avatar.url }}
                />
              </TouchableHighlight>
            );
          })}
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder={'Enter account password'}
            autoFocus={true}
            multiline={false}
            autoCorrect={false}
            onChangeText={input => this.setState({ passwordInput: input })}
            onSubmitEditing={event =>
              this.handleSubmitPassword(event.nativeEvent.text)}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={{ backgroundColor: '#baffc9' }}>
          <Header>
            <Body style={{ alignItems: 'center' }}>
              <Title>Register Your Kiddo</Title>
            </Body>
          </Header>
          <Body>
            {this.props.user.found
              ? this.kidChoices()
              : this.unregisteredView()}
          </Body>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: 250,
    height: 50,
    backgroundColor: '#bae1ff',
    textAlign: 'center',
    borderRadius: 30,
    borderColor: '#ffb3ba',
    borderWidth: 2
  },
  inputNotFound: {
    width: 250,
    height: 50,
    backgroundColor: '#ffb3ba',
    textAlign: 'center',
    borderRadius: 30
  },
  text: {
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10
  },
  child_selected: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginBottom: 10,
    marginRight: 5,
    borderColor: '#ffb3ba',
    borderWidth: 3
  },
  child_img: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginBottom: 10,
    marginRight: 5
  }
});

function mapStateToProps(state) {
  return {
    user: state.user,
    kids: state.user.kids,
    events: state.user.events
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterApp);
