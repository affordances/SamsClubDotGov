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

  changeLocation = (location, places) => {
    this.setState({ location: location, places: places });
  }

  render() {
    return (
      <div className='schedulerContainer'>
        <LocationSearch changeLocation = {this.changeLocation} />
        <MapComponent center = {this.state.location}
                      places = {this.state.places} />
      </div>
    );
  }
}

export default Scheduler;
