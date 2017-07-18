'use strict';
import React, { Component } from 'react';
import * as style from './kiddoprofile.css';

class KiddoProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};

	}

	render() {
		return(
				<div className="kiddo-profile container">
					<h1>{ this.props.kiddo.firstName } Profile</h1>
				</div>
		);
	}
}

export default KiddoProfile;
