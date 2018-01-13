import React from 'react';
import './App.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import loadGoogleMapsAPI from 'load-google-maps-api';

class LocationSearch extends React.Component {

  state = {
    address: '',
  }

  handleSelect = (address) => {
    this.setState({
      address,
    })

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.findPlaces({lat, lng});
      })
      .catch((error) => {
        console.log(error)
      })
  }

  findPlaces = (location) => {
    loadGoogleMapsAPI().then((googleMaps) => {
      const placesService = new googleMaps.places.PlacesService(document.createElement('div'));
      const bounds = new googleMaps.LatLngBounds(location);
      placesService.search({
        location: location,
        rankBy: googleMaps.places.RankBy.DISTANCE,
        types: ['fire_station']
      }, (places, status) => {
        if (status === googleMaps.places.PlacesServiceStatus.OK) {
          places = [places[0], places[6]];
          places.forEach(place => {
            bounds.extend(JSON.parse(JSON.stringify(place.geometry.location)));
          });
          this.props.changeLocation(location, places, bounds)
        }
      });
    }).catch((err) => {
      console.error(err)
    })
  }

  handleChange = (address) => {
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

export default LocationSearch;
