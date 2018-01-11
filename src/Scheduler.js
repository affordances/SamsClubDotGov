import React from 'react';
import './App.css';
import { withGoogleMap, GoogleMap } from 'react-google-maps'
import PlacesAutocomplete from 'react-places-autocomplete'


class Scheduler extends React.Component {
  render() {
    return (
      <div className='schedulerContainer'>
        <LocationSearchBox/>
        <LocationPicker />
      </div>
    );
  }
}

class LocationPicker extends React.Component {
  state = {
    userInput: '',
  }

  render() {
    const Map = withGoogleMap((props) =>
      <GoogleMap
        options={{
          styles: [
            {
              featureType: 'all',
              stylers: [{ saturation: -100 }]
            },
            {
              featureType: 'poi.business',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'transit',
              elementType: 'labels.icon',
              stylers: [{visibility: 'off'}]
            },
          ],
          fullscreenControl: false,
          clickableIcons: false,
          mapTypeControl: false,
          panControl: false,
          zoomControl: true,
          scaleControl: false,
          streetViewControl: false,
          overviewMapControl: false,
        }}
      >
      </GoogleMap>

    ); return (
      <div>
        <Map
          loadingElement={<div className='loadingElement'/>}
          containerElement={<div className='containerElement'/>}
          mapElement={<div className='mapElement'/>}
        />
      </div>
    );
  }
}

class LocationSearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSelect(address) {
    this.setState({
      address,
    })
  }

  handleChange(address) {
    this.setState({
      address,
    })
  }

  render() {
    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div>
        {formattedSuggestion.mainText}{' '}{formattedSuggestion.secondaryText}
      </div>)

    const inputProps = {
      type: "text",
      value: this.state.address,
      onChange: this.handleChange,
      autoFocus: true,
      placeholder: "Your location",
      name: 'Demo__input',
      id: "my-input-id",
    }

    const options = {
      types: ['geocode'],
      componentRestrictions: {country: 'us'},
    }

    const shouldFetchSuggestions = ({ value }) => value.length > 2

    const onError = (status, clearSuggestions) => {
      console.log('Error happened while fetching suggestions from Google Maps API', status)
      clearSuggestions()
    }

    return (
      <div className='container'>
        <PlacesAutocomplete
          onSelect={this.handleSelect}
          onError={onError}
          renderSuggestion={AutocompleteItem}
          onEnterKeyDown={this.handleSelect}
          inputProps={inputProps}
          options={options}
          shouldFetchSuggestions={shouldFetchSuggestions}
        />
      </div>
    );
  }
}

export default Scheduler;
