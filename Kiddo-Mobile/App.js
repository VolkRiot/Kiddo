// import 'expo';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store/configureStore';
import { Font } from 'expo';

import Main from './containers/Main';

const store = configureStore();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('./assets/fonts/Roboto-Regular.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (this.state.fontLoaded) {
      return (
        <Provider store={store}>
          <Main />
        </Provider>
      );
    } else {
      return <Text>...Loading</Text>;
    }
  }
}
