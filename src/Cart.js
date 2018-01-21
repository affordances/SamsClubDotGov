import React from 'react';
import './App.css';

import {
  Redirect,
  Link,
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
    )).reduce((a, b) => a + b, 0);
    const amountSaved = this.props.cart.map((item) => (
      item.listPrice
    )).reduce((a, b) => a + b, 0);
    return (
      <div className='cart-container'>
        {(cart.length > 0) ?
          <div className='cart-with-items'>
            {cart}
            <div>Total: ${total}</div>
            <div>Sam saved you: ${amountSaved}</div>
            <button onClick={this.props.proceedToCheckout}>Checkout</button>
          </div> :
          <div className='empty-cart'>
            <div className='your-cart-is-empty'>Your cart is empty!</div>
            <div className='continue-shopping'><Link to='/'>Continue shopping</Link></div>
          </div>
        }
      </div>
    );}
    else {return (
      <Redirect to='/login'/>
    );}
  }
}

export default Cart;
