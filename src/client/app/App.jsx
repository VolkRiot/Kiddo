'use strict';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

import Home from './components/landing/Home';
import NotFound from './components/NotFound';
import Dashboard from './components/dashboard/Dashboard';
import Calendar from './components/calendar/Calendar';
import AddKiddo from './components/add-child/AddKiddo';
import Kid from './components/kid-view/Kid';
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
      kiddosList: [],
      currentKiddo: 0,
      userNotFound: false
    };

    this.getUser();

    this.saveNewKiddo = this.saveNewKiddo.bind(this);
    this.getUser = this.getUser.bind(this);
    this.addNewCalendar = this.addNewCalendar.bind(this);
    this.getKiddoIndex = this.getKiddoIndex.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  async getUser() {
    const result = await Api.getCurrentUser();
    const User = result.data;

    this.setState(
      User ? { user: User, kiddosList: User.kids } : { userNotFound: true }
    );
  }

  saveNewKiddo(newKiddo) {
    let addKiddo = Api.addKiddo(newKiddo);
    // Save new Calendar too! (TODO: Make better this sucks! Consolidate);
    addKiddo.then(() => {
      this.addNewCalendar(newKiddo).then(result => {
        let kiddosList = this.state.kiddosList;
        kiddosList.push(result.data);
        this.setState({ kiddosList });
      });
    });
  }

  addNewCalendar(newKidName) {
    return Api.addCalendar(newKidName);
  }

  getKiddoIndex(index) {
    this.setState({ currentKiddo: index });
  }

  render() {
    // TODO: Could be written much much cleaner --- Rewrite
    var userFound = !this.state.userNotFound;
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/dashboard"
          render={props =>
            userFound
              ? <Dashboard
                  user={this.state.user}
                  kiddos={this.state.kiddosList}
                  getKiddoIndex={this.getKiddoIndex}
                  {...props}
                />
              : <Redirect to="/" />}
        />
        <Route
          path="/dashboard/addkiddo"
          render={props =>
            userFound
              ? <AddKiddo
                  user={this.state.user}
                  saveNewKiddo={this.saveNewKiddo}
                  ImgHelper={ImgHelper}
                  addNewCalendar={this.addNewCalendar}
                  {...props}
                />
              : <Redirect to="/" />}
        />
        <Route
          path="/dashboard/calendar"
          render={() => (userFound ? <Calendar /> : <Redirect to="/" />)}
        />

        <Route
          path="/dashboard/profile"
          render={props =>
            userFound
              ? <Kid
                  kiddo={
                    this.state.kiddosList
                      ? this.state.kiddosList[this.state.currentKiddo]
                      : ''
                  }
                  {...props}
                />
              : <Redirect to="/" />}
        />
        <Route
          path="/dashboard/map"
          render={props =>
            userFound
              ? <Mapski kiddos={this.state.kiddosList} {...props} />
              : <Redirect to="/" />}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default App;
