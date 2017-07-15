'use strict';

import React from 'react';

class ProfileCalendar extends React.Component {
	render(){
		return(
			<div className="thumbnail shake-slow">
				<a href="/#/calendar">
	              	<img src={'./img/calendar-icon.png'} />
						View Calendar
				</a>
			</div>
		)
	}
}

export default ProfileCalendar;
