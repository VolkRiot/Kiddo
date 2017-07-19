import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../redux/actions';

class RegisterApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.kidChoices = this.kidChoices.bind(this);
    this.unregisteredView = this.unregisteredView.bind(this);
  }

  handleSubmit(text) {
    this.props.actions.findParentbyEmail(text);
    // Turns red then resets the red color
    setTimeout(() => { this.props.actions.resetSearchTerm(); }, 1500);
  }

  unregisteredView() {
    return (
      <View style={styles.container}>
        <TextInput
          style={this.props.user.searchSubmitted && !this.props.user.found ? styles.inputNotFound : styles.input}
          placeholder={'Enter an email'}
          autoFocus={true}
          keyboardType={'email-address'}
          onChangeText={input => this.setState({ input })}
          multiline={false}
          onSubmitEditing={(event) => this.handleSubmit(event.nativeEvent.text)}
        />
      </View>
    );
  }

  kidChoices() {
    return this.props.kids.map((each, i) => {
      return (<Image
          style={{width: 50, height: 50}}
          key={i}
          source={{uri: each.avatar.url}}
        />);
    });
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        {this.props.user.found ? this.kidChoices() :  this.unregisteredView() }
      </View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: 250,
    height: 50,
    backgroundColor: 'skyblue',
    textAlign: 'center',
    borderRadius: 30
  },
  inputNotFound: {
    width: 250,
    height: 50,
    backgroundColor: 'red',
    textAlign: 'center',
    borderRadius: 30
  },
  text: {
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10
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
