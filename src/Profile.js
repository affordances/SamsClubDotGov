import React from 'react';
import './App.css';
import Ticket from './Ticket.js';

import html2pdf from 'html2pdf.js';

import {
  Redirect,
} from 'react-router-dom'

class Profile extends React.Component {
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
          <div className='profile-ticket-address'>
            <div>{number + ' ' + street + ' ' + streetType}</div>
            <div>{townAndCity}</div>
          </div>
        )
      }

      const sortedAppointments = this.props.appointments.sort(function(a, b){
        return new Date(b.date) - new Date(a.date);
      });

      const formattedAppointments = sortedAppointments.map((appointment, index) => (
        <div key = {index} className='profile-ticket-container'>
          <div className='profile-ticket-details-container'>
            <div className='profile-ticket-name'>{appointment.product.name}</div>
            {formatAddress(appointment.address)}
            <div className='profile-ticket-date'>{(new Date(appointment.date)).toLocaleDateString()}</div>
            <div className='profile-ticket-time'>{appointment.time}</div>
          </div>
          <div className='profile-ticket-button-container'>
            <div className='profile-ticket-button'>
              <button onClick={this.makePDF}>Download ticket</button>
            </div>
            <div className='profile-ticket-button'>
              <button onClick={this.props.cancelAppointment(index)}>Cancel appointment</button>
            </div>
          </div>
          <Ticket style={{ display: 'none', visibility: 'hidden' }}
                  user = {this.props.user}
                  ticket = {appointment}
                    plan = {this.props.plan} />
        </div>
      ));

    return (
      <div className='profile-container'>
        <div className='tab-headers-container'>
          {this.props.profileTab === 'myInfo' ?
            <div className='tab-header' onClick={this.props.changeTab('myInfo')}>My Info</div> :
            <div className='tab-header selected' onClick={this.props.changeTab('myInfo')}>My Info</div>
          }
          {this.props.profileTab === 'payments' ?
            <div className='tab-header' onClick={this.props.changeTab('payments')}>Payments</div> :
            <div className='tab-header selected' onClick={this.props.changeTab('payments')}>Payments</div>
          }
          {this.props.profileTab === 'medication' ?
            <div className='tab-header' onClick={this.props.changeTab('medication')}>Medication</div> :
            <div className='tab-header selected' onClick={this.props.changeTab('medication')}>Medication</div>
          }
          {this.props.profileTab === 'testResults' ?
            <div className='tab-header' onClick={this.props.changeTab('testResults')}>Test Results</div> :
            <div className='tab-header selected' onClick={this.props.changeTab('testResults')}>Test Results</div>
          }
          {this.props.profileTab === 'appointments' ?
            <div className='tab-header' onClick={this.props.changeTab('appointments')}>Appointments</div> :
            <div className='tab-header selected' onClick={this.props.changeTab('appointments')}>Appointments</div>
          }
        </div>
        <div className='tab-body-container'>
          {this.props.profileTab === 'myInfo' ?
            <div className='tab-body' >
              <div>{this.props.user.name}</div>
              <div>{this.props.user.hin}</div>
              <div>Sex: {this.props.user.sex}</div>
              <div>Income: ${this.props.user.income}/year</div>
              <div>{this.props.plan.name}</div>
              <div>{this.props.plan.discount}% off</div>
            </div> : null}
          {this.props.profileTab === 'payments' ?
            <div className='tab-body' >
              Some payments
            </div> : null}
          {this.props.profileTab === 'medication' ?
            <div className='tab-body' >
              Some drugs
            </div> : null}
          {this.props.profileTab === 'testResults' ?
            <div className='tab-body' >
              Some test results
            </div> : null}
          {this.props.profileTab === 'appointments' ?
            (formattedAppointments.length > 0) ?
            <div className='tab-body'>
              <div className='profile-ticket-container-container'>{formattedAppointments}</div>
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
