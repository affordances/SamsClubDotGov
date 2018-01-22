import React from 'react';
import './App.css';

import {
  Link,
} from 'react-router-dom'

class ProductPage extends React.Component {
  render() {
    const id = Number(this.props.match.params.id);
    const product = this.props.products.find(x => x.id === id);
    const alreadyInCart = !!this.props.cart.find(x => x.id === id);
    const priceCalculation = product.listPrice - (product.listPrice * (this.props.plan.discount / 100));

    return (
      <div className='product-container'>
        <div className='product-name-and-description-container'>
          <div className='product-name'>
            {product.name}
          </div>
          <hr/>
          <div className='product-description'>
            {product.description}
          </div>
        </div>
        <div className='pricing-and-button-container'>
          {!this.props.loggedIn &&
            <div className='product-page-hot-deals-container'>
              <div className='product-page-hot-deals'>
                <Link to='/login' style={{ color: 'red' }}>Sign in for HOT DEALS</Link>
              </div>
            </div>}
          {this.props.loggedIn &&
            <div className='pricing-container'>
              <div className='product-page-list-price-container'>
                <div>List price:</div>
                <div className='product-page-list-price'>${product.listPrice}</div>
              </div>
              <div className='product-page-discount-container'>
                <div>Sam pays:</div>
                <div className='product-page-discount'>{this.props.plan.discount}%</div>
              </div>
              <div className='product-page-final-price-container'>
                <div>You pay:</div>
                <div className='product-page-final-price'>${priceCalculation}</div>
              </div>
            </div>}
          {this.props.loggedIn && !alreadyInCart &&
            <div className='add-to-cart-button'>
              <button onClick={this.props.addItemToCart(product)}>Add to cart</button></div>}
          {this.props.loggedIn && alreadyInCart &&
            <div id='added-to-cart-button'><button>Added to cart</button></div>}
        </div>
      </div>
    );
  }
}

export default ProductPage;
