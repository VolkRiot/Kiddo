'use strict';

import React, { Component } from 'react';

import {Route, Switch } from 'react-router-dom';


import Home from './components/landing/Home';
import NotFound from './components/NotFound';
import Dashboard from './components/dashboard/Dashboard';
import Calendar from './components/calendar/Calendar';
import AddKiddo from './components/add-child/AddKiddo';
import ApiHelper from './utils/apiHelper';
const Api = ApiHelper();



import '../index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.saveNewKiddo = this.saveNewKiddo.bind(this);
    this.getUser = this.getUser.bind(this);
    this.addNewCalendar = this.addNewCalendar.bind(this);
  }

  componentDidMount () {
    this.getUser();
  }

  getUser () {
    const getUser = Api.getCurrentUser();
    getUser.then(result => {
      this.setState({user: result.data});
    });
  }

  saveNewKiddo (newKiddo) {
   let addKiddo = Api.addKiddo(newKiddo);
    addKiddo.then(result => {
    })
  }  
  
  addNewCalendar (newKidName) {
   let addCalendar = Api.addCalendar(newKidName);
    addCalendar.then(result => {
    })
  }  

  render() {
    return (

        <Switch>
          <Route exact path='/' component={ Home }/>
          <Route exact path='/dashboard' render={(props) => (
              <Dashboard user={ this.state.user } { ...props }/>
          )}/>
          <Route path='/dashboard/addkiddo' render={(props) => (
              <AddKiddo user={ this.state.user } saveNewKiddo={ this.saveNewKiddo } addNewCalendar={ this.addNewCalendar } { ...props }/>
          )}/>
          <Route path='/calendar' component={ Calendar }/>
          <Route component={ NotFound }/>
        </Switch>

    );
  }
}


export default App;
