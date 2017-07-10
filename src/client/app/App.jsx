'use strict';

import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Home from './components/landing/Home';
import  NotFound from './components/NotFound';
import Profile from './components/dashboard/Profile';
import Add from './components/add-child/Add';
import Kid from './components/kid-view/Kid';

import '../index.css';

class App extends React.Component {
  render() {
    return (
       <HashRouter>
        <Switch>
          <Route exact path="/" component={ Home }/>
          <Route path="/profile" component={ Profile }/>
          <Route path="/add" component={Add }/>
          <Route path="/kid" component={Kid }/>
          <Route component={ NotFound } />
        </Switch>
      </HashRouter> 
    );
  }
}

export default App;


