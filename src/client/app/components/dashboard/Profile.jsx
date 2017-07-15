'use strict';

import React from 'react';
import ProfileKid from './ProfileKid';
import ProfileMap from './ProfileMap';
import ProfileCalendar from './ProfileCalendar';
import ProfileAdd from './ProfileAdd';

class Profile extends React.Component {
	render() {
		return (
			<div className="container">
				<h1 id="icon">Kiddo</h1>
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
						<ProfileAdd />
					</div>
				</div>
			</div>

		);
	}
}

export default Profile;

