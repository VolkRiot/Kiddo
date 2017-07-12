'use strict';

import React from 'react';

class HomeFooter extends React.Component {
  constructor(props) {
    super(props);
    this.onSignInClick = this.onSignInClick.bind(this);
  }

  onSignInClick () {
    this.props.checkForUser()
  }

  render() {
    return (
      <div className="footer navbar-fixed-bottom" id="footer">
        {/* TODO:(Rima) Workaround for now, maybe want to change the button to an a tag
          but for sake of styling warpped in a tag for now */}
        <a href="/auth/google" onClick={ this.onSignInClick }>
          <button
            type="button"
            className="btn btn-outline-secondary btn-lg"
            id="signIn"
          >
            Sign In With Google >>
          </button>
        </a>
        <div className="aboutFaq"> 
          <a href="#">About </a> 
          <a href="#"> FAQ </a> 
          <a href="#">Terms</a>
        </div>
      </div>
    );
  }
}
export default HomeFooter;

