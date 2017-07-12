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
      user: null,
      newKiddo: null
    };
    this.fetchNewKiddo = this.fetchNewKiddo.bind(this);
  }
  componentDidMount () {
    let getUser = ApiHelper().getCurrentUser();
    getUser.then(result => {
      this.setState({user: result.data});
    });
  }

  fetchNewKiddo (newKiddo) {
   let addKido = ApiHelper().addKiddo(newKiddo);
    addKido.then(result => {
      console.log(result);
    })
  }

  render() {
    return (
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/profile' component={Profile}/>
          <Route path='/profile/addkiddo' render={(props) => (
              <AddKiddo user={ this.state.user } fetchNewKiddo={ this.fetchNewKiddo } {...props}/>
          )}/>
          <Route  path='/calendar' component={Calendar}/>
          <Route component={NotFound}/>
        </Switch>
    );
  }
}

export default App;
