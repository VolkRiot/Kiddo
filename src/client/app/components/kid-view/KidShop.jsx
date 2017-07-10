'use strict';

import React from 'react';

class KidShop extends React.Component {
	render(){
		return(
			<div className="kidShop">
				<h3 id="shopTitle">Shopping</h3>
					<div className="container" id="shopBox">	
					</div>
					 <div className="col-12" id="shopForm">
	    				<input type="text" className="form-control" placeholder="Type new shopping item" />
	  				</div>
  				<button type="button" className="btn btn-info">Add Item</button>
  				<button type="button" className="btn btn-warning">Reset Section</button>
			</div>

		)
	}
}

export default KidShop;

