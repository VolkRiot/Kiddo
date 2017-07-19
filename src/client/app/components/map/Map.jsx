'use strict';

import React, { Component } from 'react';
import * as style from './map.css';
import GoogleMap from './GoogleMaps';

class Mapski extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { lat: 37.773972, lng: -122.431297 },
      kiddosLocations: []
    };
  }

    render() {
      return (
        <div
          className="mapski-wrapper"
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          <GoogleMap startLocation={ this.state.location } />
        </div>
      );
    }

}

export default Mapski;
