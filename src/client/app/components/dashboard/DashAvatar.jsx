'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as style from './dashavatar.css';

class DashAvatar extends Component {
	render(){
		return (
			<div className="avatar-container">
				<Link to={ this.props.to }>
					<img src={ this.props.imgSrc } className="dash-avatar-img"/>
						<h3>{ this.props.title }</h3>
				</Link>
			</div>
		);
	}
}

export default DashAvatar;
