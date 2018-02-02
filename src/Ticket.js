import React from 'react';
import './App.css';

import html2pdf from 'html2pdf.js';

class Ticket extends React.Component {
  makePDF2 = () => {
    let el = document.getElementById('ticket-container');

    html2pdf(el, {
      html2canvas:  { dpi: 192, letterRendering: true },
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
    const name = <div>{this.props.user.name}</div>;
    const hin = <div>{this.props.user.hin}</div>;
    const address = <div>{formatAddress(this.props.ticket.address)}</div>;
    const formattedDate = <div>{date.toLocaleDateString()}</div>;
    const time = <div>{this.props.ticket.time}</div>;

    const cart = this.props.cart.map((item) => (
      <div>
        <div>{item.name}</div>
        <div>${item.listPrice}</div>
      </div>
    ));

    const ticketBody = [name, hin, address, formattedDate, time, cart];

    return (
      <div className='final-container'>
        <div id='ticket-container'>{ticketBody}</div>
        <div className='ticket-download-button'>
          <button onClick={this.makePDF2}>Download</button>
        </div>
      </div>
    )
  }
}

export default Ticket;
