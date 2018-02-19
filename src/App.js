import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import ProductPage from './ProductPage';
import ProductList from './ProductList';
import Profile from './Profile.js';
import Login from './Login.js';
import Scheduler from './Scheduler.js';
import About from './About.js';
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
    products: [],
    user: null,
    plan: null,
    chosenProduct: null,
  };

  componentDidMount = () => {
    this.setState({ products: products, chosenProduct: null })
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
    this.setState({ user: null });
    this.props.history.push('/login');
  }

  proceedToBooking = (product) => {
    return () => {
      this.setState({ chosenProduct: product })
      this.props.history.push('/scheduler');
    }
  }

  updateAppointments = (ticket) => {
    return () => {
      console.log(ticket);
      const user = Object.assign({}, this.state.user);
      user.appointments = user.appointments ? user.appointments.concat([ticket]) : [ticket];
      this.setState( { user: user });
    }
  }

  unchooseProduct = () => {
    this.setState({ chosenProduct: null })
  }

  cancelAppointment = (arrayIndex) => {
    return () => {
      const user = Object.assign({}, this.state.user);
      user.appointments = user.appointments.filter((el, index) => index !== arrayIndex);;
      this.setState( { user: user });
    }
  }

  render() {
    const loggedIn = this.state.user ? true : false;

    return (
      <div className='main-container'>
        <Header loggedIn = {loggedIn}
                products = {this.state.products}
                onLogout = {this.onLogout}
                appointments = {this.state.user ? this.state.user.appointments : []} />

        <Switch>
          <Route exact path='/' render = { (props) =>
            <Home products = {this.state.products}
                  loggedIn = {loggedIn}
                  user = {this.state.user}
                  plan = {this.state.plan} />} />

          <Route path='/about' component={About} />

          <Route path='/product/:id' render = { (props) =>
            <ProductPage products = {this.state.products}
                         match = {props.match}
                         proceedToBooking = {this.proceedToBooking}
                         loggedIn = {loggedIn}
                         user = {this.state.user}
                         plan = {this.state.plan} />} />

          <Route path='/profile' render = { (props) =>
            <Profile user = {this.state.user}
                     plan = {this.state.plan}
                     loggedIn = {loggedIn}
                     cancelAppointment = {this.cancelAppointment}
                     appointments = {this.state.user ? this.state.user.appointments : null} />} />

          <Route path='/scheduler' render = { (props) =>
            <Scheduler loggedIn = {loggedIn}
                       product = {this.state.chosenProduct}
                       unchooseProduct = {this.unchooseProduct}
                       updateAppointments = {this.updateAppointments}
                       user = {this.state.user}
                       plan = {this.state.plan} />} />

          <Route path='/login' render = { (props) =>
            <Login onLogin = {this.onLogin}
                   loggedIn = {loggedIn} />} />

          <Route path='/register' component={Register} />

          <Route component={NoMatch}/>
        </Switch>

        <Footer />
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
