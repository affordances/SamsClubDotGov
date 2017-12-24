import React from 'react';
import './App.css';

class ProductPage extends React.Component {
  render() {
    const id = Number(this.props.match.params.id);
    const product = this.props.products.find(x => x.id === id);

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
        <div>
          <button onClick={this.props.addItemToCart(product)}>
            Add to cart
          </button>
        </div>
      </div>
    );
  }
}

export default ProductPage;
