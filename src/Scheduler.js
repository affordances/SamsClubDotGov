import React from 'react';
import './App.css';
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'


class Scheduler extends React.Component {
  state = {
    location: null,
  }

  changeLocation = (location) => {
    this.setState({ location: location });
  }

  render() {
    return (
      <div className='schedulerContainer'>
        <LocationSearch changeLocation = {this.changeLocation} />
        <MapComponent center = {this.state.location} />
      </div>
    );
  }
}

class MapComponent extends React.Component {
  render() {
    const Map = withScriptjs(withGoogleMap((props) =>
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
        defaultZoom={13}
        center={this.props.center}
      >
        {<Marker position={this.props.center} />}
      </GoogleMap>

    )); return (
      <div>
        <Map
          googleMapURL="http://maps.googleapis.com/maps/api/js?v=3&libraries=places&sensor=false"
          loadingElement={<div className='loadingElement'/>}
          containerElement={<div className='containerElement'/>}
          mapElement={<div className='mapElement'/>}
        />
      </div>
    );
  }
}

class LocationSearch extends React.Component {
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

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.props.changeLocation({lat, lng});
      })
      .catch((error) => {
        console.log(error)
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

    const onError = (status) => {
      console.log('Error happened while fetching suggestions from Google Maps API', status)
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
