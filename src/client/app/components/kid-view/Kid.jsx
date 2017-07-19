'use strict';

import React, { Component } from 'react';
import KidNote from './KidNote';
import KidShop from './KidShop';
import KidReminder from './KidReminder';


class Kid extends Component {
	render(){
		return (
			<div className="kid">
				<div className="row">
					<div className="col-lg-3">
						<img src={ this.props.kiddo.avatar.url } style={{width:'74px', height: '74px', borderRadius:'50%'}} />
					</div>
					<div className="col-lg-6" id="kidTitle"> { this.props.kiddo.firstName }
					</div>
					<div className="col-lg-3"> Dropdown
					</div>
				</div>
				<div className="startNote">
					<KidNote />
				</div>
				<div className='startShop'>
					<KidShop />
				</div>
				<div className="startReminder">
					<KidReminder />
				</div>
			</div>
		);
	}
}

export default Kid;
