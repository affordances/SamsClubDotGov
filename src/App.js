import React from 'react';
import Header from './Header.js';
import ProductPage from './ProductPage';
import ProductList from './ProductList';
import Cart from './Cart.js';
import Profile from './Profile.js';
import Login from './Login.js';
import Scheduler from './Scheduler.js';
import Register from './Register';
import { sampleUser, products, plans } from './seed.js';

import persist from 'react-localstorage-hoc';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import { withRouter } from 'react-router'

class StateProvider extends React.Component {
  state = {
    products: products,
    user: null,
    plan: null,
  };

  onLogin = (e) => {
    e.preventDefault();
    const user = Object.assign({}, sampleUser);
    const userPlan = user.plan;
    const plan = plans.find(x => x.name === userPlan);
    this.setState({ plan: plan, user: user });
    this.props.history.goBack();
  }

  onLogout = () => {
    this.setState({ user: null });
    this.props.history.push('/login');
  }

  addItemToCart = (item) => {
    return () => {
      const user = Object.assign({}, this.state.user);
      user.cart = user.cart ? user.cart.concat([item]) : [item];
      if (this.state.user !== null) {
        this.setState( { user: user });
      }
    }
  }

  deleteItemFromCart = (itemId) => {
    return () => {
      const user = Object.assign({}, this.state.user);
      user.cart = user.cart.filter(x => x.id !== itemId);
      this.setState( { user: user });
    }
  }

  render() {
    const loggedIn = this.state.user ? true : false;

    return (
      <div>
        <Header loggedIn = {loggedIn}
                onLogout = {this.onLogout} />

        <Route exact path='/' render = { (props) =>
          <Home products = {this.state.products}
                loggedIn = {loggedIn}
                user = {this.state.user}
                plan = {this.state.plan} />} />

        <Route path='/product/:id' render = { (props) =>
          <ProductPage products = {this.state.products}
                       match = {props.match}
                       addItemToCart = {this.addItemToCart}
                       cart = {this.state.user ? this.state.user.cart : []}
                       loggedIn = {loggedIn}
                       user = {this.state.user}
                       plan = {this.state.plan} />} />

        <Route path='/cart' render = { (props) =>
          <Cart cart = {this.state.user ? this.state.user.cart : null}
                loggedIn = {loggedIn}
                deleteItemFromCart = {this.deleteItemFromCart}
                user = {this.state.user}
                plan = {this.state.plan} />} />

        <Route path='/profile' render = { (props) =>
          <Profile user = {this.state.user}
                   loggedIn = {loggedIn} />} />

        <Route path='/scheduler' render = { (props) =>
          <Scheduler user = {this.state.user}
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
        <ProductList products = {this.props.products}
                     loggedIn = {this.props.loggedIn}
                     user = {this.props.user}
                     plan = {this.props.plan} />
      </div>
    );
  }
}

export default App;
