'use strict';

import React, { Component } from 'react';
import { Gmaps, Marker, InfoWindow } from 'react-gmaps';

class GMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      kiddoDetail: {},
      markersList: []
    };

    this.params = { v: '3.exp', key: 'AIzaSyCsOR8WnfgE6jasLOqHXvs0wt2G7TlixY0' };
    this.onKiddoSelect = this.onKiddoSelect.bind(this);
  }

  componentDidMount() {
    setTimeout(() =>{
      let filterKiddo, markersList;

      filterKiddo = this.props.kiddosList.filter(kiddo => kiddo.coords);

      markersList = filterKiddo.map(kiddo => {
        let image;
        image = {
          url: kiddo.avatar.url,
          scaledSize: new google.maps.Size(25, 25)
        };
        return (
          <Marker
            infoWindow={ kiddo }
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
    },1500);
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
  }

  onKiddoSelect(infoWindow) {
    this.setState({ kiddoDetail: infoWindow });
  }

  render() {
    const markersList = this.state.markersList;
    const kiddoDetail = this.state.kiddoDetail;
    const initCoords = this.props.initialCenter;
    const mapConfig = {
      zoom: 12
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

