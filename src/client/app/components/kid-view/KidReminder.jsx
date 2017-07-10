'use strict';

import React from 'react';

class KidReminder extends React.Component {
	render() {
		return(
			<div className="kidReminder">
				<h3 id="reminderTitle">Reminders</h3>
					<div className="container" id="reminderBox">
					</div>
					 <div className="col-12" id="reminderForm">
	    				<input type="text" className="form-control" placeholder="Type new reminder" />
	  				</div>
  			<button type="button" className="btn btn-info">Add Reminder</button>
  			<button type="button" className="btn btn-warning">Reset Section</button>
			</div>	
		)
	}
}

export default KidReminder;

