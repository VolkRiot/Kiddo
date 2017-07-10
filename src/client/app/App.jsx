'use strict';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import Add from './components/Add';

import '../index.css';

class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/profile' component={Profile}/>
        </Switch>
    );
  }
}

export default App;
