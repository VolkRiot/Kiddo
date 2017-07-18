'use strict';

import React, { Component } from 'react';
import KidNote from './KidNote';
import KidShop from './KidShop';
import KidReminder from './KidReminder';


class Kid extends Component {
	render(){
		return(
			<div className="kid">
				<div className="row">
					<div className="col-lg-4"> <img src={'./img/girlsmall.png'} />
					</div>
					<div className="col-lg-4" id="kidTitle"> Kid Name
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
