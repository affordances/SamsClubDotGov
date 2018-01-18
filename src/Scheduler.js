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
        <div className='location-search-and-results-container'>
          <LocationSearch changeLocation = {this.changeLocation}
                          errorText = {this.state.errorText}/>
          {this.state.places ?
            <div className='results-container'>
              <div className='location-search-result-container-container'>
                <div className='location-search-result-number'>
                  1
                </div>
                <div className='location-search-result-container'>
                  <div className='location-search-result'>
                    <div className='location-search-result-name'>Uncle Sam's Club</div>
                    <div className='location-search-result-address'>{this.state.places[0].vicinity}</div>
                    <div className='location-search-result-phone'>1-800-555-SAMS</div>
                  </div>
                  <div className='location-search-result-button'>
                    <button>Select</button>
                  </div>
                </div>
              </div>
              <div className='location-search-result-container-container'>
                <div className='location-search-result-number'>
                  2
                </div>
                <div className='location-search-result-container'>
                  <div className='location-search-result'>
                    <div className='location-search-result-name'>Uncle Sam's Club</div>
                    <div className='location-search-result-address'>{this.state.places[1].vicinity}</div>
                    <div className='location-search-result-phone'>1-800-555-SAMS</div>
                  </div>
                  <div className='location-search-result-button'>
                    <button>Select</button>
                  </div>
                </div>
              </div>
            </div> : null}
        </div>
        <div className='map-container'>
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
