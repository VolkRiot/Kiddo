'use strict';

import React, { Component } from 'react';

class KidShop extends Component {
  constructor(props) {
    super(props);
		this.state = { item: '', items:[] };
		
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({item: event.target.value});
  }

  onSubmit() {
    event.preventDefault();
    console.log(this.state.item);
    var existingItems = this.state.items;
    existingItems.push(this.state.item);
    this.setState({items: existingItems});
    console.log(this.state.items);
  }

  illustrateItems() {
    if(this.state.items != ""){
      return this.state.items.map(item =>
        <li>{item}</li>
      )
    }
  }
  
  render() {
    return (
      <div className="kidShop">
        <h3 id="shopTitle">Shopping</h3>
        <div className="container" id="shopBox" >
          {this.illustrateItems()}
        </div>
        <form>
        <div className="col-12" id="shopForm">
          <input
            type="text"
            onChange={this.handleChange}
            className="form-control"
            placeholder="Type new shopping item"
          />
        </div>
        <button type="button" onClick={this.onSubmit} className="btn btn-info">
          Add Item
        </button>
        <button type="button" className="btn btn-warning">
          Reset Section
        </button>
        </form>
      </div>
    );
  }
}

export default KidShop;
