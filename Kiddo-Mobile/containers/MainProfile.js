import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../redux/actions';

class MainProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
          <Text>{JSON.stringify(this.props.kid)}</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    kid: state.kidOwner
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainProfile);
