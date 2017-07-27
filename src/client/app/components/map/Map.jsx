'use strict';

import React, { Component } from 'react';
import GMap from './GMpas';
import KiddosPanel from './kiddosPanel';
import * as style from './map.css';


class Mapski extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kiddoSelected: {},
      centerMap: {lat: 37.773972, lng: -122.431297},
      mapZoom: 12
    };
    this.onKiddoSelected = this.onKiddoSelected.bind(this);
  }

  onKiddoSelected(kiddo) {
    this.setState({ kiddoSelected: kiddo, centerMap: kiddo.coords, mapZoom: 17 });
  }

  render() {
    const kiddos = this.props.kiddos;
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
            kiddos={ kiddos }
            centerMap={ this.state.centerMap }
            mapZoom={ this.state.mapZoom }
            kiddoSelected={this.state.kiddoSelected}
            onKiddoSelected={ this.onKiddoSelected }
          />
        </div>
        <div id="floating-panel">
          <KiddosPanel
            kiddos={ kiddos }
            onKiddoSelected={ this.onKiddoSelected }
          />
        </div>
      </div>
    );
  }

}

export default Mapski;
