import React from 'react';
import './App.css';
import Ticket from './Ticket.js';

import html2pdf from 'html2pdf.js';

import {
  Redirect,
} from 'react-router-dom'

class Profile extends React.Component {
  state = {
    currentTab: 'profile',
  }

  componentWillMount = () => {
    if (this.props.linkedFromIcon === true) {
      this.setState({ currentTab: 'appointments' });
      this.props.deactivateLinkedFromIcon();
    } else {
      this.setState({ currentTab: 'profile' });
    }
  }

  changeTab = (tab) => {
    return () => {
      this.setState({ currentTab: tab });
    }
  }

  makePDF = () => {
    let el = document.getElementById('ticket-container');

    html2pdf(el, {
      filename: 'ticket.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', orientation: 'landscape', format: [8.5, 11] }
    });
  }

  render() {
    if (this.props.loggedIn) {
      const formatAddress = ({ number, street, streetType, townAndCity }) => {
        return (
          <div>{number + ' ' + street + ' ' + streetType + ', ' + townAndCity}</div>
        )
      }

      const appointments = this.props.appointments.map((appointment, index) => (
        <div key = {index}>
          <div>{appointment.product.name}</div>
          {formatAddress(appointment.address)}
          <div>{(new Date(appointment.date)).toLocaleDateString()}</div>
          <div>{appointment.time}</div>
          <button onClick={this.makePDF}>Download ticket</button>
          <button onClick={this.props.cancelAppointment(index)}>Cancel appointment</button>
          <Ticket style={{ display: 'none', visibility: 'hidden' }}
                  user = {this.props.user}
                  ticket = {appointment}
                  plan = {this.props.plan} />
        </div>
      ));

    return (
      <div className='profile-container'>
        <div className='tab-headers-container'>
          {this.state.currentTab === 'profile' ?
            <div className='tab-header' onClick={this.changeTab('profile')}>Profile</div> :
            <div className='tab-header selected' onClick={this.changeTab('profile')}>Profile</div>
          }
          {this.state.currentTab === 'plan' ?
            <div className='tab-header' onClick={this.changeTab('plan')}>Plan</div> :
            <div className='tab-header selected' onClick={this.changeTab('plan')}>Plan</div>
          }
          {this.state.currentTab === 'medication' ?
            <div className='tab-header' onClick={this.changeTab('medication')}>Medication</div> :
            <div className='tab-header selected' onClick={this.changeTab('medication')}>Medication</div>
          }
          {this.state.currentTab === 'appointments' ?
            <div className='tab-header' onClick={this.changeTab('appointments')}>Appointments</div> :
            <div className='tab-header selected' onClick={this.changeTab('appointments')}>Appointments</div>
          }
        </div>
        <div className='tab-body-container'>
          {this.state.currentTab === 'profile' ?
            <div className='tab-body' >
              <div>{this.props.user.name}</div>
              <div>{this.props.user.hin}</div>
              <div>Sex: {this.props.user.sex}</div>
              <div>Income: ${this.props.user.income}/year</div>
            </div> : null}
          {this.state.currentTab === 'plan' ?
            <div className='tab-body' >
              <div>{this.props.plan.name}</div>
              <div>{this.props.plan.discount}% off</div>
              <div>{this.props.plan.description}</div>
            </div> : null}
          {this.state.currentTab === 'medication' ?
            <div className='tab-body' >
              Some drugs
            </div> : null}
          {this.state.currentTab === 'appointments' ?
            (appointments.length > 0) ?
            <div className='tab-body'>
              {appointments}
            </div> : <div className='tab-body'>No appointments</div> : null}
        </div>
      </div>
    );}
    else {return (
      <Redirect to='/login'/>
    );}
  }
}

export default Profile;
