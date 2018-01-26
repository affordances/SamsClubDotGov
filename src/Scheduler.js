import React from 'react';
import './App.css';
import LocationSearch from './LocationSearch.js';
import MapComponent from './MapComponent.js';
import LocationResults from './LocationResults.js';
import DatePicker from './DatePicker.js';
import TimePicker from './TimePicker.js';

import FontAwesome from 'react-fontawesome';

import { Redirect } from 'react-router-dom'

class Scheduler extends React.Component {

  state = {
    address: null,
    location: null,
    places: null,
    bounds: null,
    errorText: null,
  }

  changeLocation = (address, location, places, bounds, errorText) => {
    this.setState({ address: address, location: location, places: places,
                    bounds: bounds, errorText: errorText });
  }

  render() {
    const formatAddress = ({ number, street, streetType, townAndCity }) => {
      return (
        <div>{number + ' ' + street + ' ' + streetType + ', ' + townAndCity}</div>
      )
    }

    if (this.props.cart.length > 0) {
      return (
        <div className='scheduler-container'>
          <div className='step-container'>
            {this.props.checkoutStep === 1 ?
              <div className='active-step'>Step 1: Pick a location</div> :
                this.props.ticket.address ?
                  <div className='clickable-step' onClick={this.props.updateCheckout(1)}>

                      {formatAddress(this.props.ticket.address)}
                    </div> : <div className='inactive-step'>Step 1</div>
            }
            {this.props.checkoutStep === 2 ?
              <div className='active-step'>Step 2: Pick a date</div> :
                this.props.ticket.date ?
                  <div className='clickable-step'>{this.props.ticket.date}</div> :
                  <div className='inactive-step'>Step 2</div>
            }
            {this.props.checkoutStep === 3 ?
              <div className='active-step'>Step 3: Pick a time</div> :
                this.props.ticket.time ?
                  <div className='clickable-step'>{this.props.ticket.time}</div> :
                  <div className='inactive-step'>Step 3</div>
            }
          </div>
          {this.props.checkoutStep === 1 ?
            <div className='location-search-and-results-container-container'>
              <div className='location-search-and-results-container'>
                <LocationSearch changeLocation = {this.changeLocation}
                                errorText = {this.state.errorText}/>
                              {this.state.places ? <LocationResults address = {this.state.address}
                                                                    updateCheckout = {this.props.updateCheckout} /> : null}
              </div>
              <div className='map-container'>
                <MapComponent center = {this.state.location}
                              places = {this.state.places}
                              bounds = {this.state.bounds}
                              errorText = {this.state.errorText} />
              </div>
            </div> : null}
          {this.props.checkoutStep === 2 ?
            <div className='datepicker-container'>
              <DatePicker />
            </div> : null}
          {this.props.checkoutStep === 3 ?
            <div className='timepicker-container'>
              <TimePicker />
            </div> : null}
        </div>
      );} else {
        return (
          <Redirect to='/cart'/>
        );
    }
  }
}

export default Scheduler;
