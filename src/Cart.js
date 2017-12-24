import React from 'react';
import './App.css';

class Cart extends React.Component {
  render() {
    const cart = this.props.cart.map((item) => (
      <table>
        <tr>
          <td>{item.name}</td>
          <td>${item.listPrice}</td>
          <td>
            <button onClick={this.props.deleteItemFromCart(item.id)}>
              Remove
            </button>
          </td>
        </tr>
      </table>
    ));
    return (
      <div>
        {cart}
      </div>
    );
  }
}

export default Cart;
