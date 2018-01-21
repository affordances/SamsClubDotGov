import React from 'react';
import './App.css';

import {
  Link,
} from 'react-router-dom'

class ProductPreview extends React.Component {
  render() {
    // const priceCalculation = this.props.product.listPrice -
    //       (this.props.product.listPrice * (this.props.plan.discount / 100));

    return (
      <div className='product-preview'>
        <Link to={ 'product/' + this.props.product.id }>
            <div className='product-preview-name'>
              {this.props.product.name}
            </div>
        </Link>
      </div>
    );
  }
}

export default ProductPreview;
