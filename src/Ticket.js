import React from "react";
import "./App.css";

import html2pdf from "html2pdf.js";

class Ticket extends React.Component {
  makePDF = () => {
    let el = document.getElementById("ticket-container");

    html2pdf(el, {
      filename: "ticket.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: "in", orientation: "landscape", format: [8.5, 11] },
    });
  };

  render() {
    const formatAddress = ({ number, street, streetType, cityAndState }) => {
      return (
        <div>
          {number + " " + street + " " + streetType + ", " + cityAndState}
        </div>
      );
    };

    const date = new Date(this.props.ticket.date);
    const name = this.props.user.name;
    const hin = this.props.user.hin;
    const address = formatAddress(this.props.ticket.address);
    const formattedDate = date.toLocaleDateString();
    const time = this.props.ticket.time;
    const product = this.props.ticket.product;

    return (
      <div className="final-container-container" style={this.props.style}>
        <div className="final-container">
          <div className="ticket-container-container">
            <div id="ticket-container">
              <div className="ticket-body">
                <div className="ticket-header">
                  <div className="ticket-logo">{"Uncle Sam's Club"}</div>
                  <div className="ticket-member-info">
                    <div className="ticket-name">{name}</div>
                    <div className="ticket-hin">HIN: {hin}</div>
                  </div>
                </div>
                <div className="appointment-details">
                  <div className="appointment-details-item-container">
                    <div className="appointment-details-header-item">
                      Location:
                    </div>
                    <div className="appointment-details-item">{address}</div>
                  </div>
                  <div className="appointment-details-item-container">
                    <div className="appointment-details-header-item">Date:</div>
                    <div className="appointment-details-item">
                      {formattedDate}
                    </div>
                  </div>
                  <div className="appointment-details-item-container">
                    <div className="appointment-details-header-item">Time:</div>
                    <div className="appointment-details-item">{time}</div>
                  </div>
                </div>
                <div className="ticket-with-product">
                  <div className="product-titles">
                    <div className="ticket-product-name-and-list-price-container">
                      <div>Item</div>
                      <div>List price</div>
                    </div>
                    <div className="ticket-product-discount-and-final-price-container">
                      <div>Discount</div>
                      <div>You pay</div>
                    </div>
                  </div>
                  <hr />
                  <div className="ticket-product-container">
                    <div className="ticket-product-name-and-list-price-container">
                      <div className="ticket-product-name">{product.name}</div>
                      <div className="ticket-product-list-price">
                        ${product.listPrice}
                      </div>
                    </div>
                    <div className="ticket-product-discount-and-final-price-container">
                      <div className="ticket-product-discount">
                        {this.props.discount}%
                      </div>
                      <div className="ticket-product-final-price">
                        $
                        {product.listPrice -
                          product.listPrice * (this.props.discount / 100)}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="disclaimer-container-container">
                    <div className="disclaimer-container">
                      <div className="disclaimer-text">
                        DISCLAIMER: Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor
                        in reprehenderit in voluptate velit esse cillum dolore
                        eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis
                        aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui
                        officia deserunt mollit anim id est laborum. Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis
                        aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui
                        officia deserunt mollit anim id est laborum. Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ticket-download-button">
          <button onClick={this.makePDF}>Download</button>
        </div>
      </div>
    );
  }
}

export default Ticket;
