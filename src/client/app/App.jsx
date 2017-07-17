'use strict';

import React, { Component } from 'react';
import {Route, Switch } from 'react-router-dom';

import Home from './components/landing/Home';
import NotFound from './components/NotFound';
import Dashboard from './components/dashboard/Dashboard';
import Calendar from './components/calendar/Calendar';
import AddKiddo from './components/add-child/AddKiddo';
import KiddoProfile from './components/kiddo-profile/KiddoProfile';
import Mapski from './components/map/Map';
import ApiHelper from './utils/apiHelper';
import FileStackHelper from './utils/fileStackHelper';

import '../index.css';

const Api = ApiHelper();
const ImgHelper = FileStackHelper();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      kiddosList: []
    };
    this.saveNewKiddo = this.saveNewKiddo.bind(this);
    this.getUser = this.getUser.bind(this);
    this.addNewCalendar = this.addNewCalendar.bind(this);
    this.ImgHelper = this.ImgHelper.bind(this);
  }

  componentDidMount () {
    this.getUser();
  }

  getUser () {
    const getUser = Api.getCurrentUser();
    getUser.then(result => {
      const User = result.data;
      this.setState({user: User, kiddosList: User.kids});
    });
  }

  saveNewKiddo (newKiddo) {
   let addKiddo = Api.addKiddo(newKiddo);
  // Save new Calendar too! (TODO: Make better this sucks! Consolidate);
   addKiddo.then(() => {
     this.addNewCalendar(newKiddo)
      .then(result => {
        let kiddosList = this.state.kiddosList;
        kiddosList.push(result.data);
        this.setState({ kiddosList });
      });
   });
  }

  addNewCalendar (newKidName) {
   return Api.addCalendar(newKidName);
  }

  ImgHelper () {
    return ImgHelper;
  }

  render() {
    return (

        <Switch>
          <Route exact path='/' component={ Home }/>
          <Route exact path='/dashboard' render={(props) => (
              <Dashboard user={ this.state.user } kiddos={ this.state.kiddosList } { ...props }/>
          )}/>
          <Route path='/dashboard/addkiddo' render={(props) => (
              <AddKiddo
                  user={ this.state.user }
                  saveNewKiddo={ this.saveNewKiddo }
                  ImgHelper={ this.ImgHelper }
                  addNewCalendar={ this.addNewCalendar }
                  { ...props }/>
          )}/>
          <Route path='/dashboard/calendar' component={ Calendar }/>
          <Route path='/dashboard/profile' component={ KiddoProfile }/>
          <Route path='/dashboard/map' component={ Mapski }/>
          <Route component={ NotFound }/>
        </Switch>

    );
  }
}

export default App;
