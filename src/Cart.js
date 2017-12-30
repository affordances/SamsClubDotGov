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
          <td>
            <button onClick={this.props.deleteItemFromCart(item.id)}>
              Remove
            </button>
          </td>
        </tr>
      </table>
    ));
    return (
      <div>
        {cart}
      </div>
    );}
    else {return (
      <Redirect to='/login'/>
    );}
  }
}

export default Cart;
