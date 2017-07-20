
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {DropdownButton, MenuItem, ButtonToolbar} from 'react-bootstrap';


function Drop() {
  return (
    <DropdownButton className='drop' title='Kiddo' id="test" noCaret>
      <MenuItem eventKey="1">Calendar</MenuItem>
      <MenuItem eventKey="2">Map</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Log Out</MenuItem>
    </DropdownButton>
  );
}

export default Drop;


