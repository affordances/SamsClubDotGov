import React from 'react';
import './App.css';

class LocationResults extends React.Component {
  render() {
    const formatAddress = ({ number, street, streetType, townAndCity }) => {
      return (
        <div>
          <div>{number + ' ' + street + ' ' + streetType}</div>
          <div>{townAndCity}</div>
        </div>
      )
    }

    return (
      <div className='results-container'>
        <div className='location-search-result-container-container'>
          <div className='location-search-result-number'>1</div>
          <div className='location-search-result-container'>
            <div className='location-search-result'>
              <div>{"Uncle Sam's Club"}</div>
              {formatAddress(this.props.address[0])}
            </div>
            <div className='location-search-result-button'>
              <button onClick={this.props.updateCheckout(2, this.props.address[0], 'address')}>Select</button>
            </div>
          </div>
        </div>
        <div className='location-search-result-container-container'>
          <div className='location-search-result-number'>2</div>
          <div className='location-search-result-container'>
            <div className='location-search-result'>
              <div>{"Uncle Sam's Club"}</div>
              {formatAddress(this.props.address[1])}
            </div>
            <div className='location-search-result-button'>
              <button onClick={this.props.updateCheckout(2, this.props.address[1], 'address')}>Select</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LocationResults;
