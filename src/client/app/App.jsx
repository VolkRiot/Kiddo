'use strict';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/landing/Home';
import NotFound from './components/NotFound';
import Profile from './components/dashboard/Profile';
import Add from './components/add-child/Add';

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
