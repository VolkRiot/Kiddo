'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import * as style from './dashavatar.css';

class DashAvatar extends React.Component {
	render(){
		return(
			<div className=" dash-avatar thumbnail">
				<Link to={ this.props.to }>
	              	<img src={ this.props.imgSrc } />
						<h4>{ this.props.title }</h4>
				</Link>
			</div>
		)
	}
}

export default DashAvatar;

