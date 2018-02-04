import React from 'react';
import './App.css';

import html2pdf from 'html2pdf.js';

class Ticket extends React.Component {
  makePDF2 = () => {
    let el = document.getElementById('ticket-container');

    html2pdf(el, {
      filename: 'ticket.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', orientation: 'landscape', format: [8.5, 11] }
    });

    this.props.emptyCart();
  }

  render() {
    const formatAddress = ({ number, street, streetType, townAndCity }) => {
      return (
        <div>{number + ' ' + street + ' ' + streetType + ', ' + townAndCity}</div>
      )
    }

    const date = new Date(this.props.ticket.date);
    const name = this.props.user.name;
    const hin = this.props.user.hin;
    const address = formatAddress(this.props.ticket.address);
    const formattedDate = date.toLocaleDateString();
    const time = this.props.ticket.time;

    const cart = this.props.cart.map((item) => (
      <div className='cart-item-container'>
        <div className='cart-item-name-and-list-price-container'>
          <div className='cart-item-name'>{item.name}</div>
          <div className='cart-item-list-price'>${item.listPrice}</div>
        </div>
        <div className='cart-item-discount-and-final-price-container'>
          <div className='cart-item-discount'>{this.props.plan.discount}%</div>
          <div className='cart-item-final-price'>
            ${item.listPrice - (item.listPrice * (this.props.plan.discount / 100))}
          </div>
        </div>
      </div>
    ));

    const total = this.props.cart.map((item) => (
      item.listPrice - (item.listPrice * (this.props.plan.discount / 100))
    )).reduce((a, b) => a + b, 0);

    const amountSaved = this.props.cart.map((item) => (
    item.listPrice
    )).reduce((a, b) => a + b, 0);

    return (
      <div className='final-container-container'>
        <div className='final-container'>
          <div className='ticket-container-container'>
            <div id='ticket-container'>
              <div className='ticket-body'>
                <div className='ticket-header'>
                  <div className='ticket-logo'>{"Uncle Sam's Club"}</div>
                  <div className='ticket-member-info'>
                    <div className='ticket-name'>{name}</div>
                    <div className='ticket-hin'>HIN: {hin}</div>
                  </div>
                </div>
                <div className='appointment-details'>
                  <div className='appointment-details-item-container'>
                    <div className='appointment-details-header-item'>Location:</div>
                    <div className='appointment-details-item'>{address}</div>
                  </div>
                  <div className='appointment-details-item-container'>
                    <div className='appointment-details-header-item'>Date:</div>
                    <div className='appointment-details-item'>{formattedDate}</div>
                  </div>
                  <div className='appointment-details-item-container'>
                    <div className='appointment-details-header-item'>Time:</div>
                    <div className='appointment-details-item'>{time}</div>
                  </div>
                </div>
                <div className='cart-with-items'>
                  <div className='cart-titles'>
                    <div className='cart-item-name-and-list-price-container'>
                      <div>Item</div>
                      <div>List price</div>
                    </div>
                    <div className='cart-item-remove-button'></div>
                    <div className='cart-item-discount-and-final-price-container'>
                      <div>Discount</div>
                      <div>You pay</div>
                    </div>
                  </div>
                  <hr/>
                  {cart}
                  <hr/>
                  <div className='cart-totals-and-checkout-button-container'>
                    <div className='cart-total-savings-container'>
                      <div>Sam saved you:</div>
                      <div className='cart-total-savings'>${amountSaved}</div>
                    </div>
                    <div className='cart-total-container'>
                      <div>You pay:</div>
                      <div className='cart-total'>${total}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='ticket-download-button'>
          <button onClick={this.makePDF2}>Download</button> or <button onClick={this.props.updateCheckout(1)}>Change</button>
        </div>
      </div>
    )
  }
}

export default Ticket;
