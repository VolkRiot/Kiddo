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
       <HashRouter>
        <Switch>
          <Route exact path="/" component={ Home }/>
          <Route path="/profile" component={ Profile }/>
          <Route path="/add" component={Add }/>
          <Route component={ NotFound } />
        </Switch>
      </HashRouter> 
    );
  }
}

export default App;


