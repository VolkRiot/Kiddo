'use strict';

import React, { Component } from 'react';

class KidReminder extends Component {
  	constructor(props) {
        super(props);
		this.state = { reminder: '', reminders:[] };
		
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	handleChange(event) {
		this.setState( {reminder: event.target.value } )
	}

	onSubmit() {
		event.preventDefault();
		console.log(this.state.reminder);
		var existingReminders = this.state.reminders;
		existingReminders.push(this.state.reminder);
		this.setState({reminders: existingReminders});
		console.log(this.state.reminders);
	}

	illustrateReminders(){
		if(this.state.reminders != ""){
			return this.state.reminders.map(reminder =>
				<li>{reminder}</li>
			)
		}
	}
  render() {
    return (
      <div className="kidReminder">
        <h3 id="reminderTitle">Reminders</h3>
        <div className="container" id="reminderBox">
            {this.illustrateReminders()}
        </div>
        <form>
          <div className="col-12" id="reminderForm">
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              placeholder="Type new reminder"
            />
          </div>
        <button type="button" onClick={this.onSubmit} className="btn btn-info">
        Add Reminder
        </button>
        <button type="button" className="btn btn-warning">
          Reset Section
        </button>
        </form>
        </div>
    )
  }
}

export default KidReminder;
