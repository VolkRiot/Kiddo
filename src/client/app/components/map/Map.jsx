'use strict';

import React, { Component } from 'react';
import GMap from './GMpas';
import * as style from './map.css';


class Mapski extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialCenter: { lat: 37.773972, lng: -122.431297 },
      KiddosList:[],
    };
  }
    render() {
      return (
        <div
          id="container"
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          <GMap
            initialCenter={ this.state.initialCenter }
            kiddosList={ this.state.KiddosList }
          />
        </div>
      );
    }

}

export default Mapski;
