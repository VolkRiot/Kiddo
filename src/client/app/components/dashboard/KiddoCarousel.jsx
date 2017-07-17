import React, { Component } from 'react';
import Slider from 'react-slick';
import DashAvatar from './DashAvatar';


class LeftNavButton extends React.Component {
	render() {
		return <button {...this.props}>Next</button>
	}
}


class KiddoCarousel extends Component {
	constructor(props){
		super(props);
	}
	render() {
		const kiddosArr = this.props.kiddos;
		const kiddoElement = kiddosArr.map(kiddo => {
			return (
				<div key={kiddo._id} className="avatar-container">
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
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			className: 'carousel-window',
			centerPadding: true
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
