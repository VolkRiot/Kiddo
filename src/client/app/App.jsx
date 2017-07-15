'use strict';

import React, { Component } from 'react';

import {Route, Switch } from 'react-router-dom';


import Home from './components/landing/Home';
import NotFound from './components/NotFound';
import Dashboard from './components/dashboard/Dashboard';
import Calendar from './components/calendar/Calendar';
import AddKiddo from './components/add-child/AddKiddo';
import ApiHelper from './utils/apiHelper';
import FileStackHelper from './utils/fileStackHelper';

const Api = ApiHelper();
const ImgHelper = FileStackHelper();

import '../index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
	    kiddosList:[]
    };
    this.saveNewKiddo = this.saveNewKiddo.bind(this);
    this.getUser = this.getUser.bind(this);
    this.ImgHelper = this.ImgHelper.bind(this);
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
    	let kiddosList = this.state.kiddosList;
    	kiddosList.push(result.data.body);
      this.setState({ kiddosList });
    })
  }

  ImgHelper () {
    return ImgHelper;
  }

  render() {
    return (

        <Switch>
          <Route exact path='/' component={ Home }/>
          <Route exact path='/dashboard' render={(props) => (
              <Dashboard user={ this.state.user } { ...props }/>
          )}/>
          <Route path='/dashboard/addkiddo' render={(props) => (
              <AddKiddo
                  user={ this.state.user }
                  saveNewKiddo={ this.saveNewKiddo }
                  ImgHelper={ this.ImgHelper }
                  { ...props }/>
          )}/>
          <Route path='/calendar' component={ Calendar }/>
          <Route component={ NotFound }/>
        </Switch>

    );
  }
}

export default App;
