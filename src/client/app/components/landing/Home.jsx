'use strict';

import React from 'react';
import HomeFooter from './HomeFooter';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
      <div className="main">
        <h1 className="title">Kiddo</h1>
          <h4 className="titleSmall">A Parent's Best Friend.</h4>
        <div className="row row d-flex p-2 flex-row">
          <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src={'./img/track2.png'} />
              <div className="caption">
                <h3>Track Events and Location of Children</h3>
                <p></p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src={'./img/note2.png'} />
              <div className="caption">
                <h3>Manage To-do's and Shopping Lists</h3>
                <p></p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src={'./img/notify2.png'} />
              <div className="caption">
                <h3>Updates Sent Directly to Child's Devices</h3>
                <p></p>
              </div>
            </div>
          </div>
          <div className="row">
            <HomeFooter checkForUser={ this.props.checkForUser } />
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Home;
