import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../redux/actions';

class RegisterApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: null
    };
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder={this.props.registered.parent}
            autoFocus={true}
            keyboardType={'email-address'}
            onChangeText={input => this.setState({ input })}
            onSubmitEditing={this.props.actions.findParentbyEmail}
          />
        </View>
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
  text: {
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10
  }
});

function mapStateToProps(state) {
  return {
    registered: state.register
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterApp);
