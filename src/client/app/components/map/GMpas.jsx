'use strict';

import React, { Component } from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

class GMap extends Component {
  constructor(props){
    super(props);
    this.mapConfig = {

    };
    this.params = {v: '3.exp', key: 'AIzaSyCsOR8WnfgE6jasLOqHXvs0wt2G7TlixY0'};
    this.onClick = this.onClick.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onMapCreated = this.onMapCreated.bind(this);
  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }

  onDragEnd(e) {
    console.log('onDragEnd', e);
  }

  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }

  render() {
    const initCoords = this.props.initialCenter;
    const mapConfig = {
      zoom: 12,

    };
    const markerConfig = {

    };

    return (
      <Gmaps
        width={ '100%' }
        height={ '100%' }
        lat={ initCoords.lat }
        lng={ initCoords.lng }
        zoom={ mapConfig.zoom }
        loadingMessage={ 'Loading Map!' }
        params={ this.params }
        onMapCreated={ this.onMapCreated } >
        <Marker
          lat={ initCoords.lat }
          lng={ initCoords.lng }
          draggable={ true }
          onDragEnd={ this.onDragEnd } />
        <InfoWindow
          lat={ initCoords.lat }
          lng={ initCoords.lng }
          content={ 'Hello, React :)' }
          onCloseClick={ this.onCloseClick } />
   {/*     <Circle
          lat={coords.lat}
          lng={coords.lng}
          radius={500}
          onClick={this.onClick} />*/}
      </Gmaps>
    );
  }

}

export default GMap;
