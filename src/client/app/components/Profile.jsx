'use strict';

import React from 'react';

class Profile extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-6" id="view1">
						<a href="#">View Kiddo Profiles</a>
					</div>
					<div className="col-lg-6" id="view2">
						<a href="#">View Map</a>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6" id="view3">
						<a href="#">View Calendar</a>
					</div>
					<div className="col-lg-6" id="view4">
						<a href="#">Add New Kiddo</a>
					</div>
				</div>
			</div>

		);
	}
}

export default Profile;