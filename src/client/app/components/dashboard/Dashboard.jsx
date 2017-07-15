'use strict';

import React from 'react';

import ProfileKid from './ProfileKid';
import ProfileMap from './ProfileMap';
import ProfileCalendar from './ProfileCalendar';

//import ProfileAdd from './ProfileAdd';

import { Link } from 'react-router-dom';
import {DropdownButton, MenuItem, ButtonToolbar} from 'react-bootstrap';


//(TODO) create Avater component to render each of the for elements
class Profile extends React.Component {
	render() {
		const path = this.props.match.path;
		const BUTTONS = ['Success'];
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
		return (
			<div className="container">
				<div className="drop">{buttonsInstance}</div>
					<h1 id="parentTitle">Hello, Organized!</h1>
				<div className="row" id="row1">
					<div className="col-lg-6" id="view1">
						<ProfileKid />
					</div>
					<div className="col-lg-6" id="view2">
						<ProfileMap />
					</div>
				</div>
				<div className="row" id="row2">
					<div className="col-lg-6" id="view3">
						<ProfileCalendar />
					</div>
				<div className="col-lg-6" id="view4">
					<div className="thumbnail shake-slow">
              			<Link to={ `${ path }/addkiddo` }>		
              				<img src={'./img/pencil.png'} />
							Add New Kiddo
						</Link>
					</div>
				</div>
				</div>
			</div>
		);
	}
}

export default Profile;

