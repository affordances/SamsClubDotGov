import React from 'react';
import './App.css';
import FontAwesome from 'react-fontawesome';

import { Redirect, Link } from 'react-router-dom'

class Cart extends React.Component {
  render() {
    if (this.props.loggedIn) {
      const cart = this.props.cart.map((item) => (
        <div className='cart-item-container'>
          <div className='cart-item-name-and-list-price-container'>
            <div className='cart-item-name'>{item.name}</div>
            <div className='cart-item-list-price'>${item.listPrice}</div>
          </div>
          <div className='cart-item-remove-button'>
            <FontAwesome name='times' onClick={this.props.deleteItemFromCart(item.id)}></FontAwesome>
          </div>
          <div className='cart-item-discount-and-final-price-container'>
            <div className='cart-item-discount'>{this.props.plan.discount}%</div>
            <div className='cart-item-final-price'>
              ${item.listPrice - (item.listPrice * (this.props.plan.discount / 100))}
            </div>
          </div>
        </div>
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
            <div className='cart-titles'>
              <div className='cart-item-name-and-list-price-container'>
                <div>Item</div>
                <div>List price</div>
              </div>
              <div className='cart-item-remove-button'></div>
              <div className='cart-item-discount-and-final-price-container'>
                <div>Discount</div>
                <div>You pay</div>
              </div>
            </div>
            <hr/>
            {cart}
            <hr/>
            <div className='cart-totals-and-checkout-button-container'>
              <div className='cart-total-savings-container'>
                <div>Sam saved you:</div>
                <div className='cart-total-savings'>${amountSaved}</div>
              </div>
              <div className='cart-total-container'>
                <div>You pay:</div>
                <div className='cart-total'>${total}</div>
              </div>
              <div className='checkout-button'><button onClick={this.props.proceedToCheckout}>Checkout</button></div>
            </div>
          </div> :
          <div className='empty-cart'>
            <div className='your-cart-is-empty'>Your cart is empty!</div>
            <div className='continue-shopping'><Link to='/'>Continue shopping</Link></div>
          </div>
        }
      </div>
        );
    } else {
      return (
        <Redirect to='/login'/>
        );
    }
  }
}

export default Cart;
