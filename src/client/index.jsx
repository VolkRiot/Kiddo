import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, browserHistory } from 'react-router-dom';

// components
import App from './app/App'

ReactDOM.render(
  (<HashRouter history={browserHistory}>
    <App/>
  </HashRouter>),
  document.getElementById('app')
);
