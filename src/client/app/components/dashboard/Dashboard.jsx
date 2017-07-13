'use strict';

import React from 'react';
import { Link } from 'react-router-dom';


//(TODO) create Avater component to render each of the for elements
class Profile extends React.Component {
	render() {
		const path = this.props.match.path;

		return (
			<div className="container">
				<h1 id="icon">Kiddo</h1>
					<h1 id="parentTitle">Hello, Organized!</h1>
				<div className="row" id="row1">
					<div className="col-lg-6" id="view1">
						<div className="thumbnail">
              				<img src={'./img/girl.png'} />
						<a href="#">View Kiddo Profiles</a>
						</div>
					</div>
					<div className="col-lg-6" id="view2">
						<div className="thumbnail">
              				<img src={'./img/map.png'} />
								<a href="#">View Map</a>
						</div>
					</div>
				</div>
				<div className="row" id="row2">
					<div className="col-lg-6" id="view3">
						<div className="thumbnail">
              				<img src={'./img/calendar-icon.png'} />
								<a href="/#/calendar">View Calendar</a>
						</div>
					</div>
					<div className="col-lg-6" id="view4">
						<div className="thumbnail">
              				<img src={'./img/pencil.png'} />
							<Link to={ `${ path }/addkiddo` }>Add New Kiddo</Link>
						</div>
					</div>
				</div>
			</div>

		);
	}
}

export default Profile;

