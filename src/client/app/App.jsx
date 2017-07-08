'use strict';

import React from 'react';
import '../index.css';
import Home from './components/Home';
// Steven attempting something
import Calendar from './components/Calendar'

class App extends React.Component {
  render() {
    return (
      <div className="main">
        <h1 className="title">Kiddo</h1>
        <div className="container">
          <Calendar />
        </div>
      </div>
    );
  }
}

export default App;
