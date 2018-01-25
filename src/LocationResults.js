import React from 'react';
import './App.css';

class LocationResults extends React.Component {
  render() {
    return (
      <div className='results-container'>
        <div className='location-search-result-container-container'>
          <div className='location-search-result-number'>1</div>
          <div className='location-search-result-container'>
            <div className='location-search-result'>
              <div>{"Uncle Sam's Club"}</div>
              {this.props.address[0]}
            </div>
            <div className='location-search-result-button'>
              <button>Select</button>
            </div>
          </div>
        </div>
        <div className='location-search-result-container-container'>
          <div className='location-search-result-number'>2</div>
          <div className='location-search-result-container'>
            <div className='location-search-result'>
              <div>{"Uncle Sam's Club"}</div>
              {this.props.address[1]}
            </div>
            <div className='location-search-result-button'>
              <button>Select</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LocationResults;
