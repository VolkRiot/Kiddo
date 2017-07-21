'use strict';

import React, { Component } from 'react';
import GMap from './GMpas';
import * as style from './map.css';


class Mapski extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialCenter: { lat: 37.773972, lng: -122.431297 },
      kiddosList:[],
    };
    this.addKiddos = this.addKiddos.bind(this);
  }

  // for testing
  addKiddos() {
    let newKiddosList = [
      {name:'Theo', latlng:[37.773972, -122.431297], img: 'https://cdn.filestackcontent.com/XUVISgkrTLuRroXa6oIe' },
      {name:'iza', latlng:[37.7058333, -122.4608333], img: 'https://cdn.filestackcontent.com/XUVISgkrTLuRroXa6oIe' }
    ];
    this.setState({ kiddosList: newKiddosList });
  }
  ///////////

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
          <button onClick={ this.addKiddos }>add kiddos</button>

          <GMap
            initialCenter={ this.state.initialCenter }
            kiddosList={ this.state.kiddosList }
          />

        </div>
      );
    }

}

export default Mapski;
