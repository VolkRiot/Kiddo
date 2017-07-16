'use strict';

import React from 'react';

import ProfileKid from './ProfileKid';
import ProfileMap from './ProfileMap';
import ProfileCalendar from './ProfileCalendar';

//import ProfileAdd from './ProfileAdd';

import { Link } from 'react-router-dom';
import {DropdownButton, MenuItem, ButtonToolbar} from 'react-bootstrap';

import React, { Component } from 'react';
import DashAvatar from './DashAvatar';
import * as style from './dashboard.css';


class Dashboard extends Component {
	constructor(props) {
		super(props);
	}

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

				<div className="drop">{buttonsInstance}</div>
				

			<div className="dashboard container">
				<h1 id="icon">Kiddo</h1>
				<h1 id="parentTitle">Hello, Organized!</h1>


				<div className="row" id="row1">
					<div className="col-lg-6 hvr-grow" id="view1">
						<DashAvatar
							title={ 'Kiddo Profiles' }
							imgSrc={ './img/girl.png' }
							to={ `${ path }/profile` }
						/>
					</div>
					<div className="col-lg-6 hvr-grow" id="view2">
						<DashAvatar
							title={ 'Map' }
							imgSrc={ './img/map.png' }
							to={ `${ path }/map` }
						/>
					</div>
				</div>

				<div className="row" id="row2">
					<div className="col-lg-6 hvr-grow" id="view3">
						<DashAvatar
							title={ 'Calendar' }
							imgSrc={ './img/calendar-icon.png' }
							to={ `${ path }/calendar` }   /*(TODO) change the path to /dashboard/calendar === { `${ path }/calendar` } */
						/>
					</div>
					<div className="col-lg-6 hvr-grow" id="view4">
						<DashAvatar
								title={ 'New Kiddo' }
								imgSrc={ './img/pencil.png' }
								to={ `${ path }/addkiddo` }
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
