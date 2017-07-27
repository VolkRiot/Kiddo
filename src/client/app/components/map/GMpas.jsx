/* eslint-disable no-undef */
'use strict';

import React, { Component } from 'react';
import { Gmaps, Marker, InfoWindow } from 'react-gmaps';

class GMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      mapCenter: { lat: 37.773972, lng: -122.431297 },
      mapZoom: 12,
      kiddoDetail: {},
      markersList: []
    };

    this.params = { v: '3.exp', key: 'AIzaSyCsOR8WnfgE6jasLOqHXvs0wt2G7TlixY0' };
    this.onKiddoSelect = this.onKiddoSelect.bind(this);
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
        scaledSize: new google.maps.Size(35, 35)
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
          onClick={ ()=> this.onKiddoSelect(kiddo) }
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
      fullscreenControl: true
    });
    this.boundMarkers(map);
  }

  onKiddoSelect(kiddo) {
    this.setState({ kiddoDetail: kiddo, mapCenter: kiddo.coords, mapZoom: 17 });
  }

  render() {
    const markersList = this.state.markersList;
    const kiddoDetail = this.state.kiddoDetail;
    const mapCenter = this.state.mapCenter;
    const mapZoom = this.state.mapZoom;

    return (
      <Gmaps
        width={ '100%' }
        height={ '100%' }
        lat={ mapCenter.lat }
        lng={ mapCenter.lng }
        zoom={ mapZoom }
        loadingMessage={ 'Loading Map!' }
        params={ this.params }
        onMapCreated={ this.onMapCreated }
        boundMarkers={ this.boundMarkers }
      >

        { markersList? markersList : null }

        { kiddoDetail.coords ?
          <InfoWindow
          lat={ kiddoDetail.coords.lat }
          lng={ kiddoDetail.coords.lng }
          content={ kiddoDetail.firstName }
          pixelOffset={ new google.maps.Size(0,-25) }
          /> :
          null }
      </Gmaps>
    );
  }

}

export default GMap;
