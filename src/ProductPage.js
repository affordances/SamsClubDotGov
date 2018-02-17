import React from 'react';
import './App.css';

import {
  Link,
} from 'react-router-dom'

class ProductPage extends React.Component {
  render() {
    const id = Number(this.props.match.params.id);
    const product = this.props.products.find(x => x.id === id);

    if (!product){return (<NoProduct />)}

    const priceCalculation = product.listPrice - (product.listPrice *
                             ((this.props.plan ? this.props.plan.discount : 0) / 100));

    const image = product.imagePath;

    return (
      <div className='product-container'>
        <div className='product-name-and-description-container'>
          <div className='product-name-and-icon-container'>
            <div className='product-page-icon'
              style={{mask: 'url(' + image + ') no-repeat center',
                      WebkitMask: 'url(' + image + ') no-repeat center'}}>
            </div>
            <div className='product-name'>{product.name}</div>
          </div>
          <hr/>
          <div className='product-description'>
            <p>{product.description}</p>
            <p>{product.description}</p>
          </div>
        </div>
        <div className='pricing-and-button-container'>
          {!this.props.loggedIn &&
            <div className='product-page-sign-in-container'>
              <Link to='/login'>
                <div className='product-page-hat-icon'
                  style={{mask: 'url(/hat.svg) no-repeat center',
                        WebkitMask: 'url(/hat.svg) no-repeat center'}}>
                </div>
                <div className='product-page-sign-in'>{"Sign in to see Sam's price"}</div>
              </Link>
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
          {this.props.loggedIn &&
            <div className='add-to-cart-button'>
              <button onClick={this.props.proceedToBooking(product)}>Book now</button>
            </div>}
        </div>
      </div>
    );
  }
}

class NoProduct extends React.Component {
  render() {
    return (
      <div className='page-error-container'>
        <div className='page-error'>This product does not exist!</div>
        <div className='continue-shopping'><Link to='/'>Continue shopping</Link></div>
      </div>
    )
  }
}

export default ProductPage;
