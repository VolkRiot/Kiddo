'use strict';



//import ProfileAdd from './ProfileAdd';

import React, { Component } from 'react';
import DashAvatar from './DashAvatar';
import KiddoCarousel from './KiddoCarousel';
import * as style from './dashboard.css';


class Dashboard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		
		const path = this.props.match.path;
		
		return (
			<div className="dashboard container">
				
				<div className="row">
					<div className="col-xs-12">
						<h1 id="icon">Kiddo</h1>
					</div>
				</div>
				
				<div className="row">
					<div className="col-xs-12">
						<h1 id="parentTitle">Hello, {
							this.props.user ?
								this.props.user.firstName : 'Organized'
						}!</h1>
					</div>
				</div>
				
				<div className="row" id="row1">
					<div className="col-sm-6" id="view1">
						{
							this.props.kiddos.length ?
								<div className="avatar-container carousel-container">
									<KiddoCarousel
										kiddos={ this.props.kiddos }
										to={ `${ path }/profile` }
									/>
								</div>
								:
								<div className="avatar-container">
									<DashAvatar
										title={ 'Profile' }
										imgSrc={ './img/girl.png' }
										to={ `${ path }/addkiddo` }
									/>
								</div>
						}
					</div>
					<div className="col-sm-6" id="view2">
						<div className="avatar-container">
							<DashAvatar
								title={ 'Map' }
								imgSrc={ './img/map.png' }
								to={ `${ path }/map` }
							/>
						</div>
					</div>
				</div>
				
				<div className="row" id="row2">
					<div className="col-sm-6" id="view3">
						<div className="avatar-container">
							<DashAvatar
								title={ 'Calendar' }
								imgSrc={ './img/calendar-icon.png' }
								to={ `${ path }/calendar` }
							/>
						</div>
					</div>
					<div className="col-sm-6" id="view4">
						<div className="avatar-container">
							<DashAvatar
								title={ 'New Kiddo' }
								imgSrc={ './img/pencil.png' }
								to={ `${ path }/addkiddo` }
							/>
						</div>
					</div>
				</div>
			</div>
			
		);
	}
}

export default Dashboard;
