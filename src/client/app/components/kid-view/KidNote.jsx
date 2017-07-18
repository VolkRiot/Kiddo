'use strict';

import React, { Component } from 'react';



class KidNote extends Component {
	render(){
		return (
			<div className="kidNote">
				<h3 id="noteTitle">Notes</h3>
					<div className="container" id="noteBox">
					</div>
						<div className="col-12" id="noteForm">
							<input type="text" className="form-control" placeholder="Type new note" />
						</div>
						<button type="button" className="btn btn-info">Add Note</button>
						<button type="button" className="btn btn-warning">Reset Section</button>
			</div>
		);
	}
}

export default KidNote;
