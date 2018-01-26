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
        this.findPlaces({ lat, lng });
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
        if (status === googleMaps.places.PlacesServiceStatus.OK && places.length >= 7) {
          places = [places[0], places[6]];
          places.forEach(place => {
            bounds.extend(JSON.parse(JSON.stringify(place.geometry.location)));
          });
          const address = [this.createAddress(), this.createAddress()];
          this.props.changeLocation(address, location, places, JSON.parse(JSON.stringify(bounds)));
        } else {
          const errorText = "Sorry, we don't have a store in this area! Please try a different location.";
          this.props.changeLocation(null, null, null, null, errorText);
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

  createAddress = () => {
    const streetNames = ['Second', 'Third', 'First', 'Fourth', 'Park', 'Fifth',
                         'Main', 'Sixth', 'Oak', 'Seventh', 'Pine', 'Maple',
                         'Cedar', 'Eighth', 'Elm', 'View', 'Washington',
                         'Ninth', 'Lake', 'Hill'];
    const streetTypes = ['St', 'Ave'];
    const number = Math.floor(Math.random() * 1000) + 1;
    const street = streetNames[Math.floor(Math.random() * streetNames.length)];
    const streetType = streetTypes[Math.floor(Math.random() * streetTypes.length)];
    return <div><div>{number + ' ' + street + ' ' + streetType}</div><div>{this.state.address.replace(', United States', '')}</div></div>;
  }

  render() {
    const inputProps = {
      type: "text",
      value: this.state.address.replace(', United States', ''),
      onChange: this.handleChange,
      autoFocus: true,
      placeholder: "Enter your city",
      spellCheck: false,
      name: 'input',
      id: "input-id",
    }

    const cssClasses = {
      root: 'form-group',
      input: 'form-control',
      autocompleteContainer: 'autocomplete-container'
    }

    const autocompleteItem = ({ suggestion }) => (
      <div>
        {suggestion.replace(', United States', '')}
      </div>
    )

    const options = {
      types: ['(cities)'],
      componentRestrictions: {country: 'us'},
    }

    const shouldFetchSuggestions = ({ value }) => value.length > 2

    const onError = (status) => {
      console.log('Error happened while fetching suggestions from Google Maps API', status)
    }

    return (
      <div className='form-group'>
        <PlacesAutocomplete className="form-control"
          ref={ ref => {this.autocomplete = ref} }
          onSelect={this.handleSelect}
          onError={onError}
          onEnterKeyDown={this.handleSelect}
          inputProps={inputProps}
          options={options}
          classNames={cssClasses}
          shouldFetchSuggestions={shouldFetchSuggestions}
          autocompleteItem={autocompleteItem}
          googleLogo={false}
        />
      </div>
    );
  }
}

export default LocationSearch;
