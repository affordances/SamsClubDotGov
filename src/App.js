import React from 'react';
import Header from './Header.js';
import ProductPage from './ProductPage';
import ProductList from './ProductList';
import Cart from './Cart.js';
import Profile from './Profile.js';
import Login from './Login.js';
import Register from './Register';
import { sampleUser, products } from './seed.js';

import persist from 'react-localstorage-hoc';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import { withRouter } from 'react-router'

class StateProvider extends React.Component {
  state = {
    products: products,
    cart: [],
    user: null,
  };

  onLogin = () => {
    this.setState({ user: sampleUser });
    this.props.history.push('/');
  }

  onLogout = () => {
    this.setState({ user: null });
    this.props.history.push('/');
  }

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
    const loggedIn = this.state.user ? true : false;

    return (
      <div>
        <Header loggedIn = {loggedIn}
                onLogout = {this.onLogout}/>

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
          <Profile user = {this.state.user}
                   loggedIn = {loggedIn} />} />

        <Route path='/login' render = { (props) =>
          <Login onLogin = {this.onLogin} />} />

        <Route path='/register' component={Register} />
      </div>
    );
  }
}

StateProvider = persist(StateProvider);
StateProvider = withRouter(StateProvider);

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <StateProvider />
        </Router>
      </div>
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
