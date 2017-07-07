'use strict';

import React from 'react';
import HomeFooter from './HomeFooter';

class Home extends React.Component {
  render() {
    return (
      <div className="container">
      <div className="main">
        <h1 className="title">Kiddo</h1>
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src={'./img/track.png'} />
              <div className="caption">
                <h3>Track Events and Location of Children</h3>
                <p></p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src={'./img/list.png'} />
              <div className="caption">
                <h3>Manage To-do's and Shopping Lists</h3>
                <p></p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src={'./img/notify.png'} />
              <div className="caption">
                <h3>Update Directly to Child's Devices</h3>
                <p></p>
              </div>
            </div>
          </div>
          <div className="row">
            <HomeFooter />
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Home;
