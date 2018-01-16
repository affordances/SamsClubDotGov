import React from 'react';
import './App.css';
import LocationSearch from './LocationSearch.js';
import MapComponent from './MapComponent.js';


class Scheduler extends React.Component {

  state = {
    location: null,
    places: null,
    bounds: null,
  }

  changeLocation = (location, places, bounds) => {
    this.setState({ location: location, places: places, bounds: bounds });
  }

  render() {
    return (
      <div className='scheduler-container'>
        <div className='location-search-and-map-container'>
          <LocationSearch changeLocation = {this.changeLocation} />
          <MapComponent center = {this.state.location}
                        places = {this.state.places}
                        bounds = {this.state.bounds} />
        </div>
      </div>
    );
  }
}

export default Scheduler;
