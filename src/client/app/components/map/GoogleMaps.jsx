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
    this.map.panTo( nextProps.location );
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: this.props.location,
      zoom: 8
    });
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
    )
  }
}

export default GoogleMap;
