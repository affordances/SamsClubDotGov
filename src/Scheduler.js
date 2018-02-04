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
  render() {
    const formatAddress = ({ number, street, streetType, townAndCity }) => {
      return (
        <div>{number + ' ' + street + ' ' + streetType + ', ' + townAndCity}</div>
      )
    }

    if (this.props.cart.length > 0) {
      const date = new Date(this.props.ticket.date);

      return (
        <div className='scheduler-container'>
          <div className='step-container'>
            {this.props.ticket.checkoutStep === 1 ?
              <div className='active-step'>Step 1: Pick a location</div> :
                this.props.ticket.address ?
                  <div className='clickable-step' onClick={this.props.updateCheckout(1)}>
                    {formatAddress(this.props.ticket.address)}
                  </div> :
                  <div className='inactive-step'>Step 1</div>
            }
            {this.props.ticket.checkoutStep === 2 ?
              <div className='active-step'>Step 2: Pick a date</div> :
                this.props.ticket.date ?
                  <div className='clickable-step' onClick={this.props.updateCheckout(2)}>
                    {date.toLocaleDateString()}
                  </div> :
                  <div className='inactive-step'>Step 2</div>
            }
            {this.props.ticket.checkoutStep === 3 ?
              <div className='active-step'>Step 3: Pick a time</div> :
                this.props.ticket.time ?
                  <div className='clickable-step' onClick={this.props.updateCheckout(3)}>
                    {this.props.ticket.time}
                  </div> :
                  <div className='inactive-step'>Step 3</div>
            }
          </div>
          {this.props.ticket.checkoutStep === 1 ?
            <div className='location-search-and-results-container-container'>
              <div className='location-search-and-results-container'>
                <LocationSearch changeLocation = {this.props.changeLocation}
                                errorText = {this.props.locationSearch.errorText}/>
                              {this.props.locationSearch.places ? <LocationResults address = {this.props.locationSearch.address}
                                                                    updateCheckout = {this.props.updateCheckout} /> : null}
              </div>
              <div className='map-container'>
                <MapComponent center = {this.props.locationSearch.location}
                              places = {this.props.locationSearch.places}
                              bounds = {this.props.locationSearch.bounds}
                              errorText = {this.props.locationSearch.errorText} />
              </div>
            </div> : null}
          {this.props.ticket.checkoutStep === 2 ?
            <div className='datepicker-container'>
              <DatePicker updateCheckout = {this.props.updateCheckout}
                          ticket = {this.props.ticket} />
            </div> : null}
          {this.props.ticket.checkoutStep === 3 ?
            <div className='timepicker-container-container'>
              <TimePicker updateCheckout = {this.props.updateCheckout}
                          ticket = {this.props.ticket} />
            </div> : null}
          {this.props.ticket.checkoutStep === 4 ?
              <Ticket user = {this.props.user}
                      ticket = {this.props.ticket}
                      emptyCart = {this.props.emptyCart}
                      plan = {this.props.plan}
                      cart = {this.props.user ? this.props.user.cart : []} /> : null}
        </div>
      );} else {
        return (
          <Redirect to='/cart'/>
        );
    }
  }
}

export default Scheduler;
