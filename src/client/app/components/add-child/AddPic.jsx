'use strict';


import React, { Component } from 'react';
import ApiHelper from './../../utils/apiHelper';
const Api = ApiHelper();


class AddPic extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: '',
            imgSrc: '',
			name: ''
		};
		this.onFileAdd = this.onFileAdd.bind(this);
		this.onSubmitFile = this.onSubmitFile.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
	}

    onFileAdd(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);

        reader.onloadend = () => {
            this.setState({ file: file, imgSrc: reader.result });
        };

        const data = new FormData();
        data.append('file', file);
        data.append('name', 'filenameexample');
        data.append('description', 'descriptionexample');

        console.log(data);

        Api.saveImg(data);
    }

    onInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmitFile (event) {
		event.preventDefault();

        const data = new FormData();
        data.append('file', this.state.file);
        data.append('name', 'filenameexample');
        data.append('description', 'descriptionexample');

        console.log(data);

		Api.saveImg(data);
    };

	render() {
		return (
			<div className="form-group row">
				<form onSubmit={ this.onSubmitFile }>
					<div>
						<img  style={{width:250 , height:250, borderRadius: "50%"}} src={ this.state.imgSrc }/>
					</div>
					<div>
						<input
							onChange={ this.onInputChange }
							name="name"
							value={ this.state.name }
							type="text"
							className="form-control"
							placeholder="Chose file Name"
						/>
					</div>
					<div>
						<input
							onChange={ this.onFileAdd }
							name="avatar"
							type="file"
							className="form-control"
						/>
					</div>

					<div>
						<span className="input-group-btn">
							<button type="submit" className="btn btn-secondary">Add Image</button>
						 </span>
					</div>
				</form>
			</div>
		)
	}

}

export default AddPic;