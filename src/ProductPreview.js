import React from 'react';
import './App.css';

import {
  Link,
} from 'react-router-dom'

class ProductPreview extends React.Component {
  render() {
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
          <li><img src={this.props.product.imagePath} alt='product' /></li>
        </ul>
      </div>
    );
  }
}

export default ProductPreview;
