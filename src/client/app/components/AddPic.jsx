'use strict';

import React from 'react';

class AddPic extends React.Component {
	render(){
		return(
			<div className="uploadPic">
				<h4>Upload Child Photo Below</h4>
				<label className="custom-file">
		  			<input type="file" id="file" className="custom-file-input"/>
		  				<span className="custom-file-control"></span>
				</label>
				<br />
				<button type="button" className="btn btn-outline-warning btn-lg">Submit</button>
			</div>
			)
	}
}
export default AddPic;