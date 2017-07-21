'use strict';

import React, { Component } from 'react';
import { Gmaps, Marker, InfoWindow } from 'react-gmaps';
import GMAP_KEY from './config';

class GMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      kiddoDetail: {},
      markersList: ''
    };

    this.params = { v: '3.exp', key: GMAP_KEY };
    this.onKiddoSelect = this.onKiddoSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let markersList = nextProps.kiddosList.map((kiddo, i ) => {
      let image = {
        url: kiddo.img,
        scaledSize: new google.maps.Size(25, 25)
      };

      return (
        <Marker
          kiddo={ kiddo }
          key={ i }
          lat={ kiddo.latlng[0] }
          lng={ kiddo.latlng[1] }
          draggable={ false }
          animation={ google.maps.Animation.DROP }
          icon={ image }
          onClick={ ()=> this.onKiddoSelect(kiddo) }
        />
      );
    });

    this.setState({ markersList: markersList });
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

  onKiddoSelect(newKiddo) {
    this.setState({kiddoDetail: newKiddo});
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
        { kiddoDetail.name ?
          <InfoWindow
          lat={ kiddoDetail.latlng[0] }
          lng={ kiddoDetail.latlng[1] }
          content={ kiddoDetail.name }
          pixelOffset={ new google.maps.Size(0,-25) }
          /> :
          null }



      </Gmaps>
    );
  }

}

export default GMap;

