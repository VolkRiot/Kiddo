'use strict';

import React, { Component } from 'react';

class KidShop extends Component {
  constructor(props) {
    super(props);
		this.state = { item: '', shopping: this.props.kid.shopping, placeholder: 'Type new shopping item' };

		this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetItems = this.resetItems.bind(this);
  }

  handleChange(event) {
    this.setState({item: event.target.value});
  }

  onSubmit() {
    if (this.state.item !== ''){
      var existingItems = this.state.shopping;
      existingItems.push(this.state.item);
      this.setState({shopping: existingItems, item: '', placeholder: 'Type new shopping item'});
    } else {
      this.setState({placeholder: 'Item is required to submit'});
    }

  }

  illustrateItems() {
    if (!this.state.shopping) {
			return '';
		}

    return this.state.shopping.map((item,index) =>
      <li key={index}>{item}</li>
    );
  }

  resetItems() {
    this.setState({shopping: []});
  }

  render() {
    return (
      <div className="kidShop">
        <h3 id="shopTitle">Shopping</h3>
        <div className="container" id="shopBox" >
          {this.illustrateItems()}
        </div>
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
        <button type="button" onClick={this.resetItems} className="btn btn-warning">
          Reset Section
        </button>
      </div>
    );
  }

}

export default KidShop;
