import React from 'react';
import './App.css';
import ProductPreview from './ProductPreview';

class ProductList extends React.Component {
  render() {
    const products = this.props.products.map((product, index) => (
      <ProductPreview
        product = {product}
        key = {index}
      />
    ));
    return (
      <div className='product-list'>
        {products}
      </div>
    );
  }
}

export default ProductList;
