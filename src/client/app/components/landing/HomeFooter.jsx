'use strict';

import React, { Component } from 'react';
import * as style from './homefooter.css';

class HomeFooter extends Component {
  render() {
    return (
      <div className="footer navbar-fixed-bottom" id="footer">
        {/* TODO:(Rima) Workaround for now, maybe want to change the button to an a tag
          but for sake of styling warpped in a tag for now */}
        <a href="/auth/google">
          <button
            type="button"
            className="btn btn-outline-secondary btn-lg"
            id="signIn"
          >
            Sign In With Google >>
          </button>
        </a>
        <div className="aboutFaq">
          <a href="https://github.com/VolkRiot/Kiddo">About </a>
          <a href="https://github.com/VolkRiot/Kiddo"> FAQ </a>
          <a href="https://github.com/thomaspark/bootswatch/blob/gh-pages/LICENSE">Terms</a>
        </div>
      </div>
    );
  }
}
export default HomeFooter;
