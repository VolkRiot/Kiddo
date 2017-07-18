import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

class KiddoCarousel extends Component {
	constructor(props){
		super(props);
	}
	render() {
		const kiddosArr = this.props.kiddos;
		const kiddoElement = kiddosArr.map((kiddo, index) => {
			return (
				<div key={kiddo._id} className="avatar-container">
					<Link to={ this.props.to }  onClick={ () => {this.props.getKiddoIndex(index)} } >
						<div>
							<img src={ kiddo.avatar.url }  style={{borderRadius: '50%'}} className="dash-avatar-img"/>
						</div>
						<div>
							<h3>{ kiddo.firstName }</h3>
						</div>
					</Link>
				</div>
			)
		});
		const settings = {
			dots: true,
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			className: 'avatar-container',
			centerPadding: true,
			adaptiveHeight: true,
			autoplay: true
		};
		return (
			<div>
				<Slider {...settings} >
					{ kiddoElement }
				</Slider>
			</div>
			
		);
	}
}




export default KiddoCarousel;
