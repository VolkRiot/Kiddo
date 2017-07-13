'use strict';

import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';


import Home from './components/landing/Home';
import NotFound from './components/NotFound';
import Profile from './components/dashboard/Profile';
import Add from './components/add-child/Add';
import Calendar from './components/calendar/Calendar';

import '../index.css';

class App extends Component {
  render() {
    return (
        <Home />
    );
  }
}

export default App;
