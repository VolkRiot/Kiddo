'use strict';

import React from 'react';
import AddPic from './AddPic';

class AddKiddo extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			userName: '',
			password: '',
			avatar:{url:'./img/girl.png'}
		};

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.saveImgHandler = this.saveImgHandler.bind(this);
	}

  onInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  onFormSubmit(event) {
		event.preventDefault();
    let newKiddoData = this.state;
    let okToSubmit = true;
    let user_id =  this.props.user._id;

		Object.keys(newKiddoData).map(item => {
			const input = newKiddoData[item];
			if (input === '') {
				okToSubmit = false;
			}
		});

		if (okToSubmit) {
			newKiddoData.user_id = user_id;
			this.props.saveNewKiddo(newKiddoData);

			this.setState({
				firstName: '',
				lastName: '',
				userName: '',
				password: '',
				avatar:{url:'./img/girl.png'}
			});
		}
	}

  saveImgHandler() {
		const ImgHelper = this.props.ImgHelper();
	  const fileName = (this.props.user._id || 'user').concat(this.state.firstName || 'kiddo') ;

	  ImgHelper.saveImage(fileName).then(res => {
		  if (res.filesUploaded[0]) {
			  this.setState({avatar: res.filesUploaded[0]});
		  } else {
		  	this.setState({avatar: res.filesFailed[0]}); //(TODO) TEST FAIL CASE
		  }

	  });
  }

	render(){

		return (
			<div className="addChild row">
				<h3>Register Your Kiddo Below!</h3>

					<div className="col-md-6">
						<form  onSubmit={ this.onFormSubmit }>
							<div className='form-group'>
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
					</div>
					<div className="col-md-6">
						<AddPic imgSrc={ this.state.avatar.url } user={ this.props.user } saveImgHandler={ this.saveImgHandler } />
					</div>
			</div>
		)
	}
}

export default AddKiddo;

//(TODO) validate form data preventing from submit unexpected data