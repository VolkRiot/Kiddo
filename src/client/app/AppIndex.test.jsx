import 'babel-polyfill';
import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import { HashRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const rendered = renderer.create(
  <HashRouter>
    <App/>
  </HashRouter>).toJSON();
  expect(rendered).toBeTruthy();
});
