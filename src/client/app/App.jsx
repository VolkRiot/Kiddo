'use strict';

import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Home from './components/Home';
<<<<<<< HEAD
// Steven attempting something
import Calendar from './components/Calendar'
=======
import  NotFound from './components/NotFound';
import Profile from './components/Profile';
import Add from './components/Add';

import '../index.css';
>>>>>>> origin

class App extends React.Component {
  render() {
    return (
<<<<<<< HEAD
      <div className="main">
        <h1 className="title">Kiddo</h1>
        <div className="container">
          <Calendar />
        </div>
      </div>
=======
       <Home />
>>>>>>> origin
    );
  }
}

export default App;


