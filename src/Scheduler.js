import React from 'react';
import './App.css';
import LocationSearch from './LocationSearch.js';
import MapComponent from './MapComponent.js';
import LocationResults from './LocationResults.js';
import DatePicker from './DatePicker.js';
import TimePicker from './TimePicker.js';
import Ticket from './Ticket.js';

import { Redirect } from 'react-router-dom'

class Scheduler extends React.Component {
  state = {
    checkoutStep: 1,
    appointmentTimes: null,
    ticket: { product: null, address: null, date: null, time: null },
    locationSearch: { address: null, location: null, places: null, bounds: null, errorText: null },
  }

  componentDidMount = () => {
    const times = this.generateAppointmentTimes();
    const ticket = Object.assign({}, this.state.ticket);
    ticket.product = this.props.chosenProduct;
    this.setState({ appointmentTimes: times, ticket: ticket });
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

  generateAppointmentTimes = () => {
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
      if (updateType === 'address') {
        ticket.address = update;
      }
      if (updateType === 'date') {
        ticket.date = update;
      }
      if (updateType === 'time') {
        ticket.time = update;
      }
      this.setState({ checkoutStep: step, ticket: ticket });
    }
  }

  cancelBookingInProgress = () => {
    return () => {
      this.props.history.push('/');
    }
  }

  confirmBooking = (ticket) => {
    return () => {
      this.updateCheckout(5);
      const user = Object.assign({}, this.props.user);
      user.appointments = user.appointments ? user.appointments.concat([ticket]) : [ticket];
    }
  }

  render() {
    const formatAddress = ({ number, street, streetType, townAndCity }) => {
      return (
        <div>{number + ' ' + street + ' ' + streetType + ', ' + townAndCity}</div>
      )
    }

    if (this.props.loggedIn && this.props.chosenProduct) {
      const date = new Date(this.state.ticket.date);

      return (
        <div className='scheduler-container'>
          {this.state.checkoutStep === 5 ?
            <div>
              <div className='final-step-header'>Your ticket</div>
            </div> :
            <div className='step-container'>
              {this.state.checkoutStep === 1 ?
                <div className='active-step'>Step 1: Pick a location</div> :
                  this.state.ticket.address ?
                    <div className='clickable-step' onClick={this.updateCheckout(1)}>
                      {formatAddress(this.state.ticket.address)}
                    </div> :
                    <div className='inactive-step'>Step 1</div>
              }
              {this.state.checkoutStep === 2 ?
                <div className='active-step'>Step 2: Pick a date</div> :
                  this.state.ticket.date ?
                    <div className='clickable-step' onClick={this.updateCheckout(2)}>
                      {date.toLocaleDateString()}
                    </div> :
                    <div className='inactive-step'>Step 2</div>
              }
              {this.state.checkoutStep === 3 ?
                <div className='active-step'>Step 3: Pick a time</div> :
                  this.state.ticket.time ?
                    <div className='clickable-step' onClick={this.updateCheckout(3)}>
                      {this.state.ticket.time}
                    </div> :
                    <div className='inactive-step'>Step 3</div>
              }
            </div>
          }
          {this.state.checkoutStep === 1 ?
            <div className='location-search-and-results-container-container'>
              <div className='location-search-and-results-container'>
                <LocationSearch changeLocation = {this.changeLocation}
                                errorText = {this.state.locationSearch.errorText}/>
                              {this.state.locationSearch.places ? <LocationResults address = {this.state.locationSearch.address}
                                                                    updateCheckout = {this.updateCheckout} /> : null}
              </div>
              <div className='map-container'>
                <MapComponent center = {this.state.locationSearch.location}
                              places = {this.state.locationSearch.places}
                              bounds = {this.state.locationSearch.bounds}
                              errorText = {this.state.locationSearch.errorText} />
              </div>
            </div> : null}
          {this.state.checkoutStep === 2 ?
            <div className='datepicker-container'>
              <DatePicker updateCheckout = {this.updateCheckout}
                          ticket = {this.state.ticket} />
            </div> : null}
          {this.state.checkoutStep === 3 ?
            <div className='timepicker-container-container'>
              <TimePicker updateCheckout = {this.updateCheckout}
                          ticket = {this.state.ticket} />
            </div> : null}
          {this.state.checkoutStep === 4 ?
              <div>
                <div>You will receive {this.state.ticket.product.name} at {formatAddress(this.state.ticket.address)} on {date.toLocaleDateString()} at {this.state.ticket.time}.</div>
                <div>Is this acceptable?</div>
                <button onClick={this.confirmBooking(this.state.ticket)}>Confirm</button>
                <button onClick={this.updateCheckout(1)}>Change</button>
              </div> : null}
          {this.state.ticket.checkoutStep === 5 ?
              <Ticket user = {this.props.user}
                      ticket = {this.state.ticket}
                      plan = {this.props.plan}
                      updateCheckout = {this.updateCheckout} /> : null}
        </div>
      );} else {
        return (
          <Redirect to='/'/>
        );
    }
  }
}

export default Scheduler;
