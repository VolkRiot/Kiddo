'use strict';

import React, { Component } from 'react';
import GMap from './GMpas';
import KiddosPanel from './kiddosPanel';
import * as style from './map.css';


class Mapski extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kiddos: [],
      kiddoSelected: {},
      centerMap: { lat: 37.773972, lng: -122.431297 },
      mapZoom: 12,

    };
    this.onKiddoSelected = this.onKiddoSelected.bind(this);
    this.filterKiddos = this.filterKiddos.bind(this);
  }

  componentDidMount() {
    this.filterKiddos();
  }

  filterKiddos() {
    let filteredKiddo = this.props.kiddos.filter(kiddo => kiddo.coords);
    this.setState({ kiddos: filteredKiddo, modalOpen: true });
  }

  onKiddoSelected(kiddo) {
    this.setState({ kiddoSelected: kiddo, centerMap: kiddo.coords, mapZoom: 17 });
  }

  render() {
    return (
      <div>
        <div
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }} >
          <GMap
            kiddos={ this.state.kiddos }
            centerMap={ this.state.centerMap }
            mapZoom={ this.state.mapZoom }
            kiddoSelected={this.state.kiddoSelected}
            onKiddoSelected={ this.onKiddoSelected }
          />
        </div>
        <div id="floating-panel">
          <KiddosPanel
            kiddos={ this.state.kiddos }
            onKiddoSelected={ this.onKiddoSelected }
          />
        </div>
      </div>
    );
  }

}

export default Mapski;
