'use strict';

import React from 'react';
import AddPic from './AddPic';

class Add extends React.Component {
	render(){
		return (
			<div className="addChild">
				<h3>Register Your Kiddo Below!</h3>
					<form id="childInputText">
		  				<div className="form-group">
		    				<input type="text" className="form-control" id="formGroupExampleInput" placeholder="First Name" /> 
		 				</div>
		 				 <div className="form-group">
		    				 <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Last Name" /> 
		  				</div>
		  				<div className="form-group">
		    				<input type="text" className="form-control" id="formGroupExampleInput" placeholder="User Name" /> 
		 				</div>
		 				 <div className="form-group">
		    				 <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Password (can be the same as yours)" /> 
		  				</div>
					</form>
						<AddPic />
			</div>


			)
	}
}

export default Add;