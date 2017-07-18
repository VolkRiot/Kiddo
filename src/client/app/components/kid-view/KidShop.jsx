'use strict';

import React, { Component } from 'react';

class KidShop extends Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
		this.state = { item: '', items:[], placeholder: 'Type new shopping item' };
		
=======
		this.state = { item: '', items:[] };

>>>>>>> master
		this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetItems = this.resetItems.bind(this);
  }

  handleChange(event) {
    this.setState({item: event.target.value});
  }

  onSubmit() {
<<<<<<< HEAD
    if(this.state.item !== ''){
      event.preventDefault();
      var existingItems = this.state.items;
      existingItems.push(this.state.item);
      this.setState({items: existingItems, item: '', placeholder: 'Type new shopping item'});
    } else{
      this.setState({placeholder: 'Item is required to submit'})
    }  
    
  }

  illustrateItems() {
    return this.state.items.map((item,index) =>
      <li key={index}>{item}</li>
    );
=======
    event.preventDefault();
    var existingItems;
		if (this.state.items == ''){
			existingItems = [];
		} else {
			existingItems = this.state.items;
		}
    existingItems.push(this.state.item);
    this.setState({items: existingItems});
  }

  illustrateItems() {
    if (this.state.items != ''){
      return this.state.items.map(item =>
        <li>{item}</li>
      );
    }
>>>>>>> master
  }

  resetItems(event) {
    event.preventDefault();
    this.setState({items: []});
  }

  render() {
    return (
      <div className="kidShop">
        <h3 id="shopTitle">Shopping</h3>
        <div className="container" id="shopBox" >
          {this.illustrateItems()}
        </div>
<<<<<<< HEAD
=======

>>>>>>> master
        <div className="col-12" id="shopForm">
          <input
            type="text"
            value={this.state.item}
            onChange={this.handleChange}
            className="form-control"
            placeholder={this.state.placeholder}
          />
        </div>
        <button type="button" onClick={this.onSubmit} className="btn btn-info">
          Add Item
        </button>
<<<<<<< HEAD
=======

>>>>>>> master
        <button type="button" onClick={this.resetItems} className="btn btn-warning">
          Reset Section
        </button>
      </div>
    );
  }

}

export default KidShop;
