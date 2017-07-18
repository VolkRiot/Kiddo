'use strict';

import React, { Component } from 'react';

class KidReminder extends Component {
  constructor(props) {
    super(props);
    this.state = { reminder: '', reminders:[], placeholder:'Type new reminder' };
		
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetReminders = this.resetReminders.bind(this);
	}

  handleChange(event) {
    this.setState( {reminder: event.target.value } );
  }

  onSubmit() {
    if (this.state.reminder !== ''){
      event.preventDefault();
      var existingReminders =  this.state.reminders;
      existingReminders.push(this.state.reminder);
      this.setState({reminders: existingReminders, reminder: '', placeholder: 'Type new reminder'});
    } else {
      this.setState({placeholder:'Reminder is required to submit'});
    }  
  }

  illustrateReminders(){
    return this.state.reminders.map((reminder,index) =>
      <li key={index}>{reminder}</li>
    );
  }
  
  resetReminders(){
    event.preventDefault();
    this.setState({reminders: []});
  }

  render() {
    return (
      <div className="kidReminder">
        <h3 id="reminderTitle">Reminders</h3>
        <div className="container" id="reminderBox">
            {this.illustrateReminders()}
        </div>
        <div className="col-12" id="reminderForm">
          <input
            type="text"
            value={this.state.reminder}
            onChange={this.handleChange}
            className="form-control"
            placeholder={this.state.placeholder}
          />
        </div>
        <button type="button" onClick={this.onSubmit} className="btn btn-info">
          Add Reminder
        </button>
        <button type="button" onClick={this.resetReminders} className="btn btn-warning">
          Reset Section
        </button>
      </div>
    );
  }

}

export default KidReminder;
