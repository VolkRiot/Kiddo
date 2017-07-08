'use strict';

import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Home from './components/Home';
import  NotFound from './components/NotFound';
import Profile from './components/Profile';
import Add from './components/Add';

import '../index.css';

class App extends React.Component {
  render() {
    return (
       <Home />
    );
  }
}

export default App;


