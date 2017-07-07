'use strict';

import React from 'react';

class Nav extends React.Component {
	render(){
		return(
				<nav className="navbar navbar-default">
  					<div className="container-fluid">
  					  <div className="navbar-header">
      					<h3 id="K">K</h3>
    					</div>
   						<li className="dropdown">
					        <a className="dropdown-toggle" data-toggle="dropdown" href="#">Kid Stuff
					        <span className="caret"></span></a>
					        <ul className="dropdown-menu">
					          <li><a href="#">Page 1-1</a></li>
					          <li><a href="#">Page 1-2</a></li>
					          <li><a href="#">Page 1-3</a></li>
					        </ul>
					      </li>
  						</div>
				</nav>

			)
	}
}
export default Nav;