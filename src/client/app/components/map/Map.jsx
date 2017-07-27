'use strict';

import React, { Component } from 'react';
import GMap from './GMpas';
import GMapsModal from './GMpasModal';
import * as style from './map.css';


class Mapski extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      kiddos: []
    };
  }

  componentDidMount() {
    let filteredKiddo = this.props.kiddos.filter(kiddo => kiddo.coords);
    this.setState({ kiddos: filteredKiddo, modalOpen: true });
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
     <GMapsModal modalOpen={ this.state.modalOpen } kiddos={ this.state.kiddos } />
      <GMap
        kiddos={ this.state.kiddos }
      />

      </div>
    );
  }

}

export default Mapski;
