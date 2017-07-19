import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';

const options = [
  { key: 1, text: 'Calendar', value: 1 },
  { key: 2, text: 'Map', value: 2 },
  { key: 3, text: 'Log Out', value: 3 },
];

const DropdownSimple = () => (
  <Menu compact>
    <Dropdown text='Next Up' options={options} simple item />
  </Menu>
);

export default DropdownSimple;

