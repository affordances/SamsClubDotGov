import React from 'react';
import './App.css';
import LocationSearch from './LocationSearch.js';
import MapComponent from './MapComponent.js';
import LocationResults from './LocationResults.js';

import { Redirect } from 'react-router-dom'

class Scheduler extends React.Component {

  state = {
    location: null,
    places: null,
    bounds: null,
    errorText: null,
  }

  changeLocation = (location, places, bounds, errorText) => {
    this.setState({ location: location, places: places,
                    bounds: bounds, errorText: errorText });
  }

  render() {
    if (this.props.cart.length > 0) {
      return (
        <div className='scheduler-container'>
          <div className='step-header'>Step 1: Pick a location</div>
          <div className='location-search-and-results-container-container'>
            <div className='location-search-and-results-container'>
              <LocationSearch changeLocation = {this.changeLocation}
                              errorText = {this.state.errorText}/>
              {this.state.places ? <LocationResults /> : null}
            </div>
            <div className='map-container'>
              <MapComponent center = {this.state.location}
                            places = {this.state.places}
                            bounds = {this.state.bounds}
                            errorText = {this.state.errorText} />
            </div>
          </div>
          <div className='step-header' style={{ marginTop: '20px' }}>Step 2: Pick a date and time</div>
        </div>
      );} else {
        return (
          <Redirect to='/cart'/>
        );
    }
  }
}

export default Scheduler;
