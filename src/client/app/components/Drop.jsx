
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {DropdownButton, MenuItem, ButtonToolbar} from 'react-bootstrap';


class Drop extends React.Component {

render(){

const BUTTONS = ['Default'];

function renderDropdownButton(title, i) {
  return (
    <DropdownButton bsStyle={title.toLowerCase()} title={title} key={i} id={`dropdown-basic-${i}`}>
      <MenuItem eventKey="1">Calendar</MenuItem>
      <MenuItem eventKey="2">Map</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Log Out</MenuItem>
    </DropdownButton>
  );
}

const buttonsInstance = (
  <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
);
}
}

export default Drop;


