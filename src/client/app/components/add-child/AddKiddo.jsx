'use strict';

import React from 'react';
import AddPic from './AddPic';

class Add extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			userName: '',
			password: ''
		};

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onValidateForm = this.onValidateForm.bind(this);
	}

  onInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  onValidateForm() {

		this.onFormSubmit(event);

  }

  onFormSubmit(event) {

    let newKiddoData = this.state;
    newKiddoData.user_id = this.props.user._id;

    this.props.saveNewKiddo(newKiddoData);
    this.setState({
	    firstName: '',
      lastName: '',
      userName: '',
      password: ''
    });
    event.preventDefault();
  }

	render(){
		return (
			<div className="addChild">
				<h3>Register Your Kiddo Below!</h3>
					<form id="childInputText" onSubmit={ this.onValidateForm }>
		  				<div className="form-group">
		    				<input
								    onChange={ this.onInputChange }
								    name="firstName"
								    value={ this.state.firstName }
								    type="text"
								    className="form-control"
								    placeholder="First Name"
						    />
		 				</div>
		 				 <div className="form-group">
		    				 <input
								     onChange={ this.onInputChange }
								     name ="lastName"
								     value={ this.state.lastName }
								     type="text"
								     className="form-control"
								     placeholder="Last Name"
						     />
		  				</div>
		  				<div className="form-group">
		    				<input
								    onChange={ this.onInputChange }
								    name ="userName"
								    value={ this.state.userName }
								    type="text"
								    className="form-control"
								    placeholder="User Name"
						    />
		 				</div>
		 				 <div className="form-group">
		    				 <input
								     onChange={ this.onInputChange }
								     name ="password"
								     value={ this.state.password }
								     type="password"
								     className="form-control"
								     placeholder="Password (can be the same as yours)"
						     />
		  				</div>

							<div>
								<span className="input-group-btn">
			            <button type="submit" className="btn btn-secondary">Submit</button>
			          </span>
							</div>

					</form>
					{/*	<AddPic />*/}
			</div>
		)
	}
}

export default Add;

//(TODO) validate form data preventing from submit unexpected data