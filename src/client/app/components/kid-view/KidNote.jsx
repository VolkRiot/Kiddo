'use strict';

import React, { Component } from 'react';



class KidNote extends Component {
	constructor(props) {
        super(props);
		this.state = { note: '', notes:[] };
		
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.resetNotes = this.resetNotes.bind(this);
	}

	handleChange(event) {
		this.setState( {note: event.target.value } )
	}

	onSubmit() {
		event.preventDefault();
		console.log(this.state.note);
		var existingNotes;
		if(this.state.notes == ""){
			existingNotes = []; 
		} else{
			existingNotes = this.state.notes;
		} 
		existingNotes.push(this.state.note);
		this.setState({notes: existingNotes});
		console.log(this.state.notes);
	}

	illustrateNotes() {
		if(this.state.notes != ""){
			return this.state.notes.map(note =>
				<li>{note}</li>
			)
		}
	}

	resetNotes(){
		event.preventDefault();
		this.setState({notes: ''});
	}
	
	render(){
		return(
			<div className="kidNote">
				<h3 id="noteTitle">Notes</h3>
					<div className="container" id="noteBox">
						{this.illustrateNotes()}	
					</div>
					<div className="col-12" id="noteForm">
	    				<input type="text" name='note' onChange={this.handleChange} className="form-control" placeholder="Type new note" />
	  				</div>
  					<button type="button" onClick={this.onSubmit} className="btn btn-info">Add Note</button>
  					<button type="button" onClick={this.resetNotes} className="btn btn-warning">Reset Section</button>
				</div>
		)
	}
}

export default KidNote;
