import React from 'react';
import Header from './Header.js';
import ProductPage from './ProductPage';
import ProductList from './ProductList';
import Cart from './Cart.js';
import Profile from './Profile.js';
import Login from './Login.js';
import Register from './Register';
import { sampleUser, products } from './seed.js';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

class App extends React.Component {
  state = {
    products: products,
    cart: [],
    sampleUser: sampleUser,
  };

  addItemToCart = (item) => {
    return () => {
      this.setState( {cart: this.state.cart.concat([item]) });
    }
  }

  deleteItemFromCart = (itemId) => {
    return () => {
      this.setState( {cart: this.state.cart.filter(x => x.id !== itemId) });
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Header />

          <Route exact path='/' render = { (props) =>
            <Home products = {this.state.products} />} />

          <Route path='/product/:id' render = { (props) =>
            <ProductPage products = {this.state.products}
                         match = {props.match}
                         addItemToCart = {this.addItemToCart} />} />

          <Route path='/cart' render = { (props) =>
            <Cart cart = {this.state.cart}
                  deleteItemFromCart = {this.deleteItemFromCart} />} />

          <Route path='/profile' render = { (props) =>
            <Profile sampleUser = {this.state.sampleUser} />} />

          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </div>
      </Router>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <div className='body'>
        <ProductList products = {this.props.products} />
      </div>
    );
  }
}

export default App;
