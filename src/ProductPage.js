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
    const notAddedYet = <div><button onClick={this.props.addItemToCart(product)}>Add to cart</button></div>;
    const alreadyAdded = <div><button>Added to cart</button></div>;
    const loggedOutButton = <div><button><Link to='/login'>Add to cart</Link></button></div>;
    const loggedInButton = alreadyInCart ? alreadyAdded : notAddedYet;
    const button = this.props.loggedIn ? loggedInButton : loggedOutButton;

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
        <div>
          <img src={product.imagePath} alt='product' />
        </div>
        {button}
      </div>
    );
  }
}

export default ProductPage;
