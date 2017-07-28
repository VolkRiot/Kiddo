import React, { Component } from 'react';
import { MapView } from 'expo';
import { StyleSheet } from 'react-native';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: this.props.location.latitude,
      longitude: this.props.location.longitude
    };
  }
  componentWillReceiveProps({ location }) {
    if (location) {
      this.setState({
        latitude: location.latitude,
        longitude: location.longitude
      });
    }
  }
  render() {
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
