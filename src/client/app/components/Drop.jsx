'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Drop() {
  return (
    <DropdownButton className="drop" title="Kiddo" id="test" noCaret>
      <LinkContainer to="/dashboard/calendar">
        <MenuItem eventKey="1">Calendar</MenuItem>
      </LinkContainer>
      <LinkContainer to="/dashboard/map">
        <MenuItem eventKey="2">Map</MenuItem>
      </LinkContainer>
      <LinkContainer to="/dashboard/addkiddo">
        <MenuItem eventKey="3">New Kiddo</MenuItem>
      </LinkContainer>
      <MenuItem divider />
      {/* TODO: Currently no logout strategy -- Here is a temp one */}
      <LinkContainer to="/">
        <MenuItem eventKey="4">Log Out</MenuItem>
      </LinkContainer>
    </DropdownButton>
  );
}

export default Drop;
