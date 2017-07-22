import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../redux/actions';

class MainProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>
          {JSON.stringify(this.props.kid)}
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    kid: state.user.kidOwner
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainProfile);
