import React from 'react';
import './App.css';

import {
  Redirect,
} from 'react-router-dom'

class Cart extends React.Component {
  render() {
    if (this.props.loggedIn)
    {const cart = this.props.cart.map((item) => (
      <table>
        <tr>
          <td>{item.name}</td>
          <td>${item.listPrice}</td>
          <td>{this.props.plan.discount}%</td>
          <td>${item.listPrice - (item.listPrice * (this.props.plan.discount / 100))}</td>
          <td>
            <button onClick={this.props.deleteItemFromCart(item.id)}>
              Remove
            </button>
          </td>
        </tr>
      </table>
    ));
    const total = this.props.cart.map((item) => (
      item.listPrice - (item.listPrice * (this.props.plan.discount / 100))
    )).reduce((a,b) => a+b, 0);
    const amountSaved = this.props.cart.map((item) => (
      item.listPrice
    )).reduce((a,b) => a+b, 0);
    return (
      <div>
        {cart}
        {cart.length > 0 && <div>Total: ${total}</div>}
        {cart.length > 0 && <div>Sam saved you ${amountSaved}</div>}
      </div>

    );}
    else {return (
      <Redirect to='/login'/>
    );}
  }
}

export default Cart;
