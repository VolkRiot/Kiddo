'use strict';
// TODO: Refactor to make more DRY and consolidate with other components

import React, { Component } from 'react';
import ApiHelper from '../../utils/apiHelper';

const Api = ApiHelper();

class KidShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      shopping: this.props.kid.shopping,
      placeholder: 'Type new shopping item',
      shoppingsToRemove: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetItems = this.resetItems.bind(this);
    this.markForDeletion = this.markForDeletion.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ shopping: nextProps.kid.shopping });
  }

  handleChange(event) {
    this.setState({ item: event.target.value });
  }

  onSubmit() {
    if (this.state.item !== '') {
      var existingItems = this.state.shopping;
      existingItems.push(this.state.item);

      if (this.props.kid) {
        this.props.kid.shopping = existingItems;
        Api.updateKiddo(this.props.kid)
          .then(response => {
            this.setState({
              shopping: response.data.body.shopping,
              item: '',
              placeholder: 'Type new shopping item'
            });
          })
          .catch(err => {
            throw new Error(err);
          });
      }
    } else {
      this.setState({ placeholder: 'Item is required to submit' });
    }
  }

  markForDeletion(shopping) {
    const markedForDeletion = this.state.shoppingsToRemove;
    const indexOf = markedForDeletion.indexOf(shopping);

    if (indexOf !== -1) {
      markedForDeletion.splice(indexOf, 1);
    } else {
      markedForDeletion.push(shopping);
    }

    this.setState({ shoppingsToRemove: markedForDeletion });
  }

  illustrateItems() {
    if (!this.state.shopping) {
      return '';
    }

    return this.state.shopping.map((item, index) => {
      if (this.state.shoppingsToRemove.indexOf(item) === -1) {
        return (
          <li key={index} onClick={this.markForDeletion.bind(this, item)}>
            {item}
          </li>
        );
      } else {
        return (
          <li key={index} onClick={this.markForDeletion.bind(this, item)}>
            <s style={{ color: 'gray' }}>
              {item}
            </s>
          </li>
        );
      }
    });
  }

  resetItems() {
    this.props.kid.shopping = [];

    Api.updateKiddo(this.props.kid)
      .then(response => {
        this.setState({
          shopping: response.data.body.shopping,
          item: '',
          placeholder: 'Type new shopping item'
        });
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  render() {
    return (
      <div className="kidShop">
        <h3 id="shopTitle">Shopping</h3>
        <div className="container" id="shopBox">
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
        <button
          type="button"
          onClick={this.onSubmit}
          className="btn btn-info kid-view-button"
        >
          Add Item
        </button>
        <button
          type="button"
          onClick={this.resetItems}
          className="btn btn-warning kid-view-button"
        >
          Reset Section
        </button>
      </div>
    );
  }
}

export default KidShop;
