import React from 'react'
import HomeFooter from './HomeFooter'

class Home extends React.Component {
  render(){
    

    return(
      <div className="container">
		    <div className="row">
  				<div className="col-sm-6 col-md-4">
    			<div className="thumbnail">
            <img src={'./img/track.png'} />
       		 <div className="caption">        		
            <h3>Track</h3>
        		<p>Events and Location of Children</p>
       		</div>
   		 </div>
  		</div>
  				<div className="col-sm-6 col-md-4">
    			<div className="thumbnail">
          <img src={'./img/list.png'} />
     		 <div className="caption">
        		<h3>Manage</h3>
        		<p>To-do's and Shopping Lists</p>
       		</div>
   		 </div>
  		</div>
  			<div className="col-sm-6 col-md-4">
    			<div className="thumbnail">
          <img src={'./img/notify.png'} />
     		 <div className="caption">
        		<h3>Update</h3>
        		<p>Reminders Directly to Child's Phone</p>
       		</div>
   		 </div>
 	   </div>
      <div className="container">
        <HomeFooter/>
      </div>
	  </div>
     
    </div>

    )
  }
}



export default Home;