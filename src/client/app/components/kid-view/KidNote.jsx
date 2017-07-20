'use strict';

import React, { Component } from 'react';
import ApiHelper from '../../utils/apiHelper';

// const Api = ApiHelper();

class KidNote extends Component {
	constructor(props) {
		super(props);
		this.state = { note: '', notes: this.props.kid.notes, placeholder:'Type new note' };

		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.resetNotes = this.resetNotes.bind(this);
	}

	handleChange(event) {
		this.setState( {note: event.target.value } );
	}

	// componentDidMount() {
	// 	if (this.props.kid && this.props.kid.notes) {
	// 		this.setState({ notes: nextProps.kid.notes });
	// 	}
	// }

	onSubmit() {
		if (this.state.note !== ''){
			var existingNotes = this.state.notes;
			existingNotes.push(this.state.note);
			this.setState({notes: existingNotes, note: '', placeholder: 'Type new note'});
		} else {
			this.setState({placeholder:'Note is required to submit'});
		}
	}

	illustrateNotes() {
		if (!this.state.notes) {
			return '';
		}

		return this.state.notes.map((note,index) =>
			<li key={index}>{note}</li>
		);
	}

	resetNotes(){
		this.setState({notes: []});
	}

	render(){
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
				<button type="button" onClick={this.onSubmit} className="btn btn-info">
					Add Note
				</button>
				<button type="button" onClick={this.resetNotes} className="btn btn-warning">
					Reset Section
				</button>
			</div>
		);
	}

}

export default KidNote;
