'use strict';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/landing/Home';
import NotFound from './components/NotFound';
import Profile from './components/dashboard/Profile';
import Calendar from './components/calendar/Calendar';
import AddKiddo from './components/add-child/AddKiddo';
import ApiHelper from './utils/apiHelper';

import '../index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.saveNewKiddo = this.saveNewKiddo.bind(this);
    this.checkForUser = this.checkForUser.bind(this);
  }
  checkForUser () {
    let getUser = ApiHelper().isUserAuthenticated();
    getUser.then(result => {
      this.setState({user: result.data});
    });
  }

  saveNewKiddo (newKiddo) {
   let addKiddo = ApiHelper().addKiddo(newKiddo);
    addKiddo.then(result => {
      console.log(result.data);
    })
  }



  render() {
    return (
        <Switch>
          <Route exact path='/' render={(props) => (
              < Home checkForUser={ this.checkForUser } { ...props }/>
          )}/>
          <Route exact path='/profile' component={ Profile }/>
          <Route path='/profile/addkiddo' render={(props) => (
              <AddKiddo user={ this.state.user } saveNewKiddo={ this.saveNewKiddo } { ...props }/>
          )}/>
          <Route  path='/calendar' component={ Calendar }/>
          <Route component={ NotFound }/>
        </Switch>
    );
  }
}

export default App;
