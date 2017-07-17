import React, { Component } from 'react';
import Slider from 'react-slick';
import DashAvatar from './DashAvatar';

class KiddoCarousel extends Component {
	constructor(props){
		super(props);
	}
	render() {
		const kiddosArr = this.props.kiddos;
		const kiddoElement = kiddosArr.map(kiddo => {
			return (
				<div key={kiddo._id}>
					<DashAvatar
						title={ kiddo.firstName }
						imgSrc={ kiddo.avatar.url }
						to={ `${this.props.to}/${kiddo._id}` }
					/>
				</div>
			)
		});
		const settings = {
			dots: true,
			infinite: true,
			speed: 100,
			slidesToShow: 1,
			slidesToScroll: 1
		};
		return (
				<Slider {...settings}>
					{ kiddoElement }
				</Slider>
		);
	}
}

export default KiddoCarousel;
