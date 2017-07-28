/* eslint-disable no-undef */
'use strict';

import React, { Component } from 'react';
import { Gmaps, Marker, InfoWindow } from 'react-gmaps';

class GMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      markersList: []
    };

    this.params = { v: '3.exp', key: 'AIzaSyCsOR8WnfgE6jasLOqHXvs0wt2G7TlixY0' };
    this.buildMarkers = this.buildMarkers.bind(this);
    this.boundMarkers = this.boundMarkers.bind(this);
  }

  componentDidMount() {
    setTimeout(() =>{
    this.buildMarkers();
    },1500);
  }

  buildMarkers() {
    let kiddos, markersList;

    kiddos = this.props.kiddos;

    markersList = kiddos.map(kiddo => {
      let image;

      image = {
        url: kiddo.avatar.url,
        scaledSize: new google.maps.Size(40, 40)
      };
      return (
        <Marker
          data={ kiddo }
          key={ kiddo._id }
          lat={ kiddo.coords.lat }
          lng={ kiddo.coords.lng }
          draggable={ false }
          animation={ google.maps.Animation.DROP }
          icon={ image }
          onClick={ ()=> this.props.onKiddoSelected(kiddo) }
        />
      );
    });
    this.setState({ markersList: markersList });
  }

  boundMarkers(map) {
    let kiddosList, bounds;

    kiddosList = this.props.kiddos;
    bounds = new google.maps.LatLngBounds();

    kiddosList.map(kiddo => {
      let latLng = kiddo.coords;
      bounds.extend(latLng);
      map.fitBounds(bounds);
    });
  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: false
    });
    this.boundMarkers(map);
  }

  render() {
    const markersList = this.state.markersList;
    const kiddoSelected = this.props.kiddoSelected;
    const centerMap = this.props.centerMap;
    const mapZoom = this.props.mapZoom;

    return (
      <Gmaps
        width={ '100%' }
        height={ '100%' }
        lat={ centerMap.lat }
        lng={ centerMap.lng }
        zoom={ mapZoom }
        loadingMessage={ 'Loading Map!' }
        params={ this.params }
        onMapCreated={ this.onMapCreated }
        boundMarkers={ this.boundMarkers }
      >

        { markersList? markersList : null }

        { kiddoSelected.coords ?
          <InfoWindow
          lat={ kiddoSelected.coords.lat }
          lng={ kiddoSelected.coords.lng }
          content={ kiddoSelected.firstName }
          pixelOffset={ new google.maps.Size(0,-30) }
          /> :
          null }
      </Gmaps>
    );
  }

}

export default GMap;
