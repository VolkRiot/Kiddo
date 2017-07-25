'use strict';
// TODO: Refactor to make more DRY and consolidate with other components

import React, { Component } from 'react';
import ApiHelper from '../../utils/apiHelper';

const Api = ApiHelper();

class KidReminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminder: '',
      reminders: this.props.kid.reminders,
      placeholder: 'Type new reminder',
      remindersToRemove: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetReminders = this.resetReminders.bind(this);
    this.markForDeletion = this.markForDeletion.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ reminders: nextProps.kid.reminders });
  }

  handleChange(event) {
    this.setState({ reminder: event.target.value });
  }

  onSubmit() {
    if (this.state.reminder !== '') {
      var existingReminders = this.state.reminders;
      existingReminders.push(this.state.reminder);

      if (this.props.kid) {
        this.props.kid.reminders = existingReminders;
        Api.updateKiddo(this.props.kid)
          .then(response => {
            this.setState({
              reminders: response.data.body.reminders,
              reminder: '',
              placeholder: 'Type new reminder'
            });
          })
          .catch(err => {
            throw new Error(err);
          });
      }
    } else {
      this.setState({ placeholder: 'Reminder is required to submit' });
    }
  }

  markForDeletion(reminder) {
    const markedForDeletion = this.state.remindersToRemove;
    const indexOf = markedForDeletion.indexOf(reminder);

    if (indexOf !== -1) {
      markedForDeletion.splice(indexOf, 1);
    } else {
      markedForDeletion.push(reminder);
    }

    this.setState({ remindersToRemove: markedForDeletion });
  }

  illustrateReminders() {
    if (!this.state.reminders) {
      return '';
    }

    return this.state.reminders.map((reminder, index) => {
      if (this.state.remindersToRemove.indexOf(reminder) === -1) {
        return (
          <li key={index} onClick={this.markForDeletion.bind(this, reminder)}>
            {reminder}
          </li>
        );
      } else {
        return (
          <li key={index} onClick={this.markForDeletion.bind(this, reminder)}>
            <s style={{ color: 'gray' }}>
              {reminder}
            </s>
          </li>
        );
      }
    });
  }

  resetReminders() {
    this.props.kid.reminders = [];

    Api.updateKiddo(this.props.kid)
      .then(response => {
        this.setState({
          reminders: response.data.body.reminders,
          reminder: '',
          placeholder: 'Type new reminder'
        });
      })
      .catch(err => {
        throw new Error(err);
      });
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
        <button
          type="button"
          onClick={this.onSubmit}
          className="btn btn-info kid-view-button"
        >
          Add Reminder
        </button>
        <button
          type="button"
          onClick={this.resetReminders}
          className="btn btn-warning kid-view-button"
        >
          Reset Section
        </button>
      </div>
    );
  }
}

export default KidReminder;
