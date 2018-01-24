import React from 'react';
import './App.css';

class LocationResults extends React.Component {
  createAddress = (array) => {
    const streetTypes = ['St', 'Ave'];
    const number = Math.floor(Math.random() * 1000);
    const street = array[Math.floor(Math.random() * array.length)];
    const streetType = streetTypes[Math.floor(Math.random() * streetTypes.length)];
    return number + ' ' + street + ' ' + streetType;
  }

  render() {
    const streetNames = ['Second', 'Third', 'First', 'Fourth', 'Park', 'Fifth',
                         'Main', 'Sixth', 'Oak', 'Seventh', 'Pine', 'Maple',
                         'Cedar', 'Eighth', 'Elm', 'View', 'Washington',
                         'Ninth', 'Lake', 'Hill'];

    return (
      <div className='results-container'>
        <div className='location-search-result-container-container'>
          <div className='location-search-result-number'>1</div>
          <div className='location-search-result-container'>
            <div className='location-search-result'>
              <div>{"Uncle Sam's Club"}</div>
              <div>{this.createAddress(streetNames)}</div>
              <div>{this.props.city}</div>
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
              <div>{this.createAddress(streetNames)}</div>
              <div>{this.props.city}</div>
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
