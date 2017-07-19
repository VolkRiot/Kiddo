'use strict';

import React, { Component } from 'react';
import KidNote from './KidNote';
import KidShop from './KidShop';
import KidReminder from './KidReminder';

class Kid extends Component {
	constructor(props) {
		super(props);
		this.state = { defaultKid : {
				photo: './img/girl.png',
				firstName: ''
			} };
	}
	render(){
		return (
			<div className="kid">
				<div className="row">
					<div className="col-lg-4">
						<img src={ this.props.kiddo ?
							this.props.kiddo.avatar.url :
							this.state.defaultKid.photo }
							style={{width:'74px', height: '74px', borderRadius:'50%'}}
						/>
					</div>
					<div className="col-lg-4" id="kidTitle"> { this.props.kiddo ?
						this.props.kiddo.firstName :
						this.state.defaultKid.firstName }
					</div>
					<div className="col-lg-4"> Dropdown
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
