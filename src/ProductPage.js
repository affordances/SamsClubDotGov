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
      <div className='product-page'>
        <div>
          {product.name}
        </div>
        <div>
          {product.description}
        </div>
        <div>
          List price: ${product.listPrice}
        </div>
        {!this.props.loggedIn && <div><Link to='/login'>Sign in to see HOT DEALS</Link></div>}
        {this.props.loggedIn && <div>Sam pays: {this.props.plan.discount}%</div>}
        {this.props.loggedIn && <div>You pay: ${priceCalculation}</div>}
        <div>
          <img src={product.imagePath} alt='product' />
        </div>
        {!this.props.loggedIn && <div><button><Link to='/login'>Add to cart</Link></button></div>}
        {this.props.loggedIn && !alreadyInCart &&
          <div><button onClick={this.props.addItemToCart(product)}>Add to cart</button></div>}
        {this.props.loggedIn && alreadyInCart && <div><button>Added to cart</button></div>}
      </div>
    );
  }
}

export default ProductPage;
