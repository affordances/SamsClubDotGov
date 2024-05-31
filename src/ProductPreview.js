import React from "react";
import "./App.css";

import { Link } from "react-router-dom";

class ProductPreview extends React.Component {
  render() {
    const image = this.props.product.imagePath;

    return (
      <Link to={"product/" + this.props.product.id}>
        <div className="product-preview">
          <div className="product-preview-image-container">
            <div
              className="product-preview-image"
              style={{
                mask: "url(" + image + ") no-repeat center",
                WebkitMask: "url(" + image + ") no-repeat center",
              }}
            ></div>
          </div>
          <div className="product-preview-name">{this.props.product.name}</div>
        </div>
      </Link>
    );
  }
}

export default ProductPreview;
