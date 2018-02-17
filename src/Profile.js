import React from 'react';
import './App.css';
import Ticket from './Ticket.js';

import {
  Redirect,
} from 'react-router-dom'

class Profile extends React.Component {
  render() {
    console.log(this.props.appointments);

    if (this.props.loggedIn) {
      const appointments = this.props.appointments.map((appointment) => (
        <div>
          <div>{appointment.product.name}</div>
          <div>{appointment.time}</div>
        </div>
      ));

    return (
      <div className='profile-container'>
        {(appointments.length > 0) ?
          {appointments} : <div>No appointments</div>}
      </div>
    );}
    else {return (
      <Redirect to='/login'/>
    );}
  }
}

export default Profile;
