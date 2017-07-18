import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

// components
import App from './app/App';

ReactDOM.render(
  (<HashRouter>
    <App/>
  </HashRouter>),
  document.getElementById('app')
);
