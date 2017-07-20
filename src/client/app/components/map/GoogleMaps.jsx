'use strict';

import React, { Component } from 'react';

class GoogleMap extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.map.panTo( nextProps.startLocation );
  }

  componentDidMount() {

    const mapConfig =  {
      center: this.props.startLocation,
      zoom: 13,
      draggableCursor:'crosshair',
      clickableIcons: false,
      streetViewControl: false,
      mapTypeControl: false
    };

    this.map = new google.maps.Map(this.refs.map, mapConfig);

  }

  render() {
    const mapStyle = {
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0
    };

    return (
      <div ref="map" style={mapStyle}>I should be a map!</div>
    );
  }
}

export default GoogleMap;
