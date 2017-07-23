import 'babel-polyfill';
import React from 'react';
import renderer from 'react-test-renderer';
import { HashRouter } from 'react-router-dom';

import Drop from './Drop';

it('renders without crashing', () => {
  const rendered = renderer.create(
<HashRouter>
  <Drop/>
</HashRouter>).toJSON();
  expect(rendered).toBeTruthy();
});
