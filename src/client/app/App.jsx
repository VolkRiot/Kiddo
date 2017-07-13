'use strict';

import React, { Component } from 'react';

import {Route, Switch } from 'react-router-dom';


import Home from './components/landing/Home';
import Profile from './components/dashboard/Profile';
import Add from './components/add-child/Add';
import Kid from './components/kid-view/Kid'
import Calendar from './components/calendar/Calendar';
import NotFound from './components/NotFound';


import '../index.css';

class App extends Component {
  render() {
    return (
       <Switch>  
           <Route exact path='/' component={Home}/>    
           <Route exact path='/profile' component={Profile}/>    
           <Route exact path='/calendar' component={Calendar}/>    
      </Switch>
    );
  }
}

export default App;
