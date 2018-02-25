import React from 'react';
import './App.css';
import Ticket from './Ticket.js';

import FontAwesome from 'react-fontawesome';
import html2pdf from 'html2pdf.js';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

import {
  Redirect,
  Link,
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
      const formatAddress = ({ number, street, streetType, cityAndState }) => {
        return (
          <div className='profile-ticket-address'>
            <div style={{ textAlign: 'right' }}>{number + ' ' + street + ' ' + streetType}</div>
            <div style={{ textAlign: 'right' }}>{cityAndState}</div>
          </div>
        )
      }

      const sortedAppointments = this.props.appointments.sort(function(a, b){
        return new Date(a.date) - new Date(b.date);
      });

      const formattedAppointments = sortedAppointments.map((appointment, index) => (
        <div key = {index} className='profile-ticket-container'>
          <div className='profile-ticket-details-container'>
            <div className='profile-ticket-name-and-address-container'>
              <div className='profile-ticket-name'>{appointment.product.name}</div>
              {formatAddress(appointment.address)}
            </div>
            <div className='profile-ticket-date-and-time-container'>
              <div className='profile-ticket-date'>{(new Date(appointment.date)).toLocaleDateString()}</div>
              <div className='profile-ticket-time'>{appointment.time}</div>
            </div>
          </div>
          <div className='profile-ticket-button-container'>
            <div className='profile-ticket-button'>
              <FontAwesome name='arrow-down' size='2x' style={{ cursor: 'pointer' }} onClick={this.makePDF}></FontAwesome>
            </div>
            <div className='profile-ticket-button'>
              <FontAwesome name='ban' size='2x' style={{ cursor: 'pointer' }} onClick={this.props.cancelAppointment(index)}></FontAwesome>
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
              <div className='my-info-container-container'>
                <div className='my-info-container'>
                  <div className='my-info-name-container'>
                    <div className='my-info-header'>Name:</div>
                    {this.props.user.name}
                  </div>
                  <div className='my-info-address-container'>
                    <div className='my-info-header'>Address:</div>
                    {this.props.user.address.street}, {this.props.user.address.cityAndState}
                  </div>
                  <div className='my-info-hin-container'>
                    <div className='my-info-header'>HIN:</div>
                    {this.props.user.hin}
                  </div>
                  <div className='my-info-plan-container'>
                    <div className='my-info-header'>Plan:</div>
                    {this.props.plan.name}
                  </div>
                </div>
                <div className='employment-info-container'>
                  <div className='employment-info-header-container'>
                    <div className='employment-info-header'>Employed: </div>
                    {this.props.user.employed ?
                      <div className='employment-info-header-item'>Yes</div> :
                      <div className='employment-info-header-item'>No</div>}
                  </div>
                  <div className='employment-toggle-container'>
                    <Toggle
                      checked={this.props.user.employed}
                      onChange={this.props.updateEmploymentStatus()}
                    />
                  </div>
                  <div className='employment-warning'>(Please don't lie. We will check.)</div>
                </div>
              </div>
            </div> : null}
          {this.props.profileTab === 'payments' ?
            <div className='tab-body'>
            </div> : null}
          {this.props.profileTab === 'medication' ?
            <div className='tab-body'>
            </div> : null}
          {this.props.profileTab === 'testResults' ?
            <div className='tab-body'>
            </div> : null}
          {this.props.profileTab === 'appointments' ?
            (formattedAppointments.length > 0) ?
            <div className='tab-body'>
              <div className='profile-ticket-container-container'>
                <div className='profile-ticket-header-container'>
                  <div className='profile-ticket-header'>
                    <div className='profile-ticket-details-container'>
                      <div className='profile-ticket-name-and-address-container'>
                        <div>Procedure</div>
                        <div>Location</div>
                      </div>
                      <div className='profile-ticket-date-and-time-container'>
                        <div>Date</div>
                        <div>Time</div>
                      </div>
                    </div>
                    <div className='profile-ticket-button-container'>
                      <div>Download</div>
                      <div>Cancel</div>
                    </div>
                  </div>
                  <hr/>
                </div>
                {formattedAppointments}
              </div>
            </div> :
            <div className='page-error-container' style={{ border: 'none', marginBottom: '0px' }}>
              <div className='page-error'>No appointments</div>
              <div className='continue-shopping'><Link to='/'>Continue shopping</Link></div>
            </div> : null}
        </div>
      </div>
    );}
    else {return (
      <Redirect to='/login'/>
    );}
  }
}

export default Profile;
