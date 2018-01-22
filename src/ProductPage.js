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
          {!this.props.loggedIn && <div className='product-page-hot-deals'>
            <Link to='/login'>Sign in for HOT DEALS</Link></div>}
          {this.props.loggedIn &&
            <div className='pricing-and-button'>
              <div className='product-page-list-price'>List price: ${product.listPrice}</div>
              <div>Sam pays: {this.props.plan.discount}%</div>
              <div>You pay: ${priceCalculation}</div>
            </div>}
          {this.props.loggedIn && !alreadyInCart &&
            <div><button onClick={this.props.addItemToCart(product)}>Add to cart</button></div>}
          {this.props.loggedIn && alreadyInCart &&
            <div><button>Added to cart</button></div>}
        </div>
      </div>
    );
  }
}

export default ProductPage;
