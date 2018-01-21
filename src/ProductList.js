import React from 'react';
import './App.css';
import ProductPreview from './ProductPreview';

class ProductList extends React.Component {
  render() {
    const products = this.props.products.map((product, index) => (
      <ProductPreview
        loggedIn = {this.props.loggedIn}
        user = {this.props.user}
        plan = {this.props.plan}
        product = {product}
        key = {index}
      />
    ));
    return (
      <div className='products-container'>
        {products}
      </div>
    );
  }
}

export default ProductList;
