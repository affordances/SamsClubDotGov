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

import './App.css';

import persist from 'react-localstorage-hoc';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom'

import { withRouter } from 'react-router'

class StateProvider extends React.Component {
  state = {
    products: null,
    user: null,
    plan: null,
    ticket: { checkoutStep: 1, appointmentTimes: null, address: null, date: null, time: null },
    locationSearch: { address: null, location: null, places: null, bounds: null, errorText: null },
  };

  componentDidMount = () => {
    this.setState({ products: products })
  }

  onLogin = (e) => {
    e.preventDefault();
    const user = Object.assign({}, sampleUser);
    const userPlan = user.plan;
    const plan = plans.find(x => x.name === userPlan);
    this.setState({ plan: plan, user: user });
    this.props.history.goBack();
  }

  onLogout = () => {
    const ticket = Object.assign({}, this.state.ticket);
    ticket.checkoutStep = 1;
    this.setState({ user: null, ticket: ticket });
    this.props.history.push('/login');
  }

  proceedToCheckout = () => {
    const times = this.generateAppointments();
    this.setState({ ticket: { checkoutStep: 1, appointmentTimes: times, address: null, date: null, time: null },
                    locationSearch: { address: null, location: null, places: null, bounds: null, errorText: null },
                  });
    this.props.history.push('/scheduler');
  }

  changeLocation = (address, location, places, bounds, errorText) => {
    const locationSearch = Object.assign({}, this.state.locationSearch);
    locationSearch.address = address;
    locationSearch.location = location;
    locationSearch.places = places;
    locationSearch.bounds = bounds;
    locationSearch.errorText = errorText;
    this.setState({ locationSearch: locationSearch });
  }

  generateAppointments = () => {
    let appointments = [];
    while (appointments.length < 3) {
      const appointment = Math.floor(Math.random() * (18 - 7 + 1)) + 7;
      if (!appointments.includes(appointment))
      appointments.push(appointment);
    }
    appointments.sort(function(a, b){return a - b});
    return appointments.map((appointment) => {
      let time = ((appointment - 1) % 12) + 1;
      const amArray = [':00 AM', ':30 AM'];
      const pmArray = [':00 PM', ':30 PM'];
      const randomAm = amArray[Math.floor(Math.random() * amArray.length)];
      const randomPm = pmArray[Math.floor(Math.random() * pmArray.length)];
      time = time + ((appointment < 12) ? randomAm : randomPm);
      return time;
      }
    )
  }

  updateCheckout = (step, update, updateType) => {
    return () => {
      const ticket = Object.assign({}, this.state.ticket);
      ticket.checkoutStep = step;
      if (updateType === 'address') {
        ticket.address = update;
      }
      if (updateType === 'date') {
        ticket.date = update;
      }
      if (updateType === 'time') {
        ticket.time = update;
      }
      this.setState({ ticket: ticket });
    }
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
      <div className='main-container'>
        <Header loggedIn = {loggedIn}
                onLogout = {this.onLogout}
                cart = {this.state.user ? this.state.user.cart : []} />
        <Switch>
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
                  proceedToCheckout = {this.proceedToCheckout}
                  user = {this.state.user}
                  plan = {this.state.plan} />} />

          <Route path='/profile' render = { (props) =>
            <Profile user = {this.state.user}
                     loggedIn = {loggedIn} />} />

          <Route path='/scheduler' render = { (props) =>
            <Scheduler user = {this.state.user}
                       updateCheckout = {this.updateCheckout}
                       ticket = {this.state.ticket}
                       changeLocation = {this.changeLocation}
                       locationSearch = {this.state.locationSearch}
                       cart = {this.state.user ? this.state.user.cart : []} />} />

          <Route path='/login' render = { (props) =>
            <Login onLogin = {this.onLogin}
                   loggedIn = {loggedIn} />} />

          <Route path='/register' component={Register} />

          <Route component={NoMatch}/>
        </Switch>
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
      <div>
        <ProductList products = {this.props.products}
                     loggedIn = {this.props.loggedIn}
                     user = {this.props.user}
                     plan = {this.props.plan} />
      </div>
    );
  }
}

class NoMatch extends React.Component {
  render() {
    return (
      <div className='page-error-container'>
        <div className='page-error'>This page does not exist!</div>
        <div className='continue-shopping'><Link to='/'>Continue shopping</Link></div>
      </div>
    )
  }
}

export default App;
