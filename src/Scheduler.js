import React from 'react';
import './App.css';
import LocationSearch from './LocationSearch.js';
import MapComponent from './MapComponent.js';

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
    return (
      <div className='scheduler-container'>
        <div className='location-search-and-map-container'>
          <LocationSearch changeLocation = {this.changeLocation}
                          errorText = {this.state.errorText}/>
          <MapComponent center = {this.state.location}
                        places = {this.state.places}
                        bounds = {this.state.bounds}
                        errorText = {this.state.errorText} />
        </div>
      </div>
    );
  }
}

export default Scheduler;
