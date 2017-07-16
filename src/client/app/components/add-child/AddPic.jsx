'use strict';
import React, { Component } from 'react';
import * as style from './addpic.css';

class AddPic extends Component {
	render() {

		return (
			<div className="add-pic form-group row">
				<div>
					<button onClick={ this.props.saveImgHandler } className="btn btn-secondary">
						<img src={ this.props.imgSrc } style={{width:250 , height:250, borderRadius: "50%"}} />
					</button>
					<h3>Add Photo</h3>
				</div>
			</div>
		)
	}

}

export default AddPic;
