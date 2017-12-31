import React from 'react';
import './App.css';

import {
  Link,
} from 'react-router-dom'

class ProductPreview extends React.Component {
  render() {
    const priceCalculation = this.props.product.listPrice - (this.props.product.listPrice * (this.props.plan.discount / 100));
    const loggedOutPrice = <li><Link to='/login'>Sign in to see HOT DEALS</Link></li>;
    const DiscountAndPrice = <div><li>Sam pays: {this.props.plan.discount}%</li><li>You pay: ${priceCalculation}</li></div>;
    const loggedInDiscountAndPrice = this.props.loggedIn ? DiscountAndPrice : loggedOutPrice;

    return (
      <div>
        <ul>
          <li>
            <Link to={ 'product/' + this.props.product.id }>
              {this.props.product.name}
            </Link>
          </li>
          <li>{this.props.product.description}</li>
          <li>List price: ${this.props.product.listPrice}</li>
          {loggedInDiscountAndPrice}
          <li><img src={this.props.product.imagePath} alt='product' /></li>
        </ul>
      </div>
    );
  }
}

export default ProductPreview;
