'use strict';
// TODO: Refactor to make more DRY and consolidate with other components

import React, { Component } from 'react';
import ApiHelper from '../../utils/apiHelper';

const Api = ApiHelper();

class KidNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: '',
      notes: this.props.kid.notes,
      placeholder: 'Type new note',
      notesToRemove: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetNotes = this.resetNotes.bind(this);
    this.markForDeletion = this.markForDeletion.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ notes: nextProps.kid.notes });
  }

  handleChange(event) {
    this.setState({ note: event.target.value });
  }

  onSubmit() {
    if (this.state.note !== '') {
      var existingNotes = this.state.notes;
      existingNotes.push(this.state.note);

      if (this.props.kid) {
        this.props.kid.notes = existingNotes;
        Api.updateKiddo(this.props.kid)
          .then(response => {
            this.setState({
              notes: response.data.body.notes,
              note: '',
              placeholder: 'Type new note'
            });
          })
          .catch(err => {
            throw new Error(err);
          });
      }
    } else {
      this.setState({ placeholder: 'Note is required to submit' });
    }
  }

  markForDeletion(note) {
    const markedForDeletion = this.state.notesToRemove;
    const indexOf = markedForDeletion.indexOf(note);

    if (indexOf !== -1) {
      markedForDeletion.splice(indexOf, 1);
    } else {
      markedForDeletion.push(note);
    }

    this.setState({ notesToRemove: markedForDeletion });
  }

  illustrateNotes() {
    if (!this.state.notes) {
      return '';
    }

    return this.state.notes.map((note, index) => {
      if (this.state.notesToRemove.indexOf(note) === -1) {
        return (
          <li key={index} onClick={this.markForDeletion.bind(this, note)}>
            {note}
          </li>
        );
      } else {
        return (
          <li key={index} onClick={this.markForDeletion.bind(this, note)}>
            <s style={{ color: 'gray' }}>
              {note}
            </s>
          </li>
        );
      }
    });
  }

  resetNotes() {
    this.props.kid.notes = [];

    Api.updateKiddo(this.props.kid)
      .then(response => {
        this.setState({
          notes: response.data.body.notes,
          note: '',
          placeholder: 'Type new note'
        });
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  render() {
    return (
      <div className="kidNote">
        <h3 id="noteTitle">Notes</h3>
        <div className="container" id="noteBox">
          {this.illustrateNotes()}
        </div>
        <div className="col-12" id="noteForm">
          <input
            type="text"
            value={this.state.note}
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
          Add Note
        </button>
        <button
          type="button"
          onClick={this.resetNotes}
          className="btn btn-warning kid-view-button"
        >
          Reset Section
        </button>
      </div>
    );
  }
}

export default KidNote;
