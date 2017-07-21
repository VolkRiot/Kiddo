'use strict';

import React, { Component } from 'react';
import GoogleMap from './GoogleMaps';
import * as style from './map.css';


class Mapski extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startLocation: { lat: 37.773972, lng: -122.431297 },
      KiddosList: { lat: 37.773972, lng: -122.431297 },
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
          <GoogleMap
            startLocation={ this.state.startLocation }
            kiddosList={ this.state.KiddosList }
          />
        </div>
      );
    }

}

export default Mapski;
