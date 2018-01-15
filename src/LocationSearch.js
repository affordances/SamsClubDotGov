import React from 'react';
import './App.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import loadGoogleMapsAPI from 'load-google-maps-api';

class LocationSearch extends React.Component {

  state = {
    address: '',
  }

  componentDidMount() {
      const that = this.autocomplete;

      that.autocompleteCallback = function(predictions, status) {
        if (status !== that.autocompleteOK) {
          that.props.onError(status, that.clearSuggestions)
          return
        }

        const countPlaces = (location, googleMaps) => {
          const placesService = new googleMaps.places.PlacesService(document.createElement('div'));
            return new Promise(function(resolve) {
              placesService.search({
                location: location,
                rankBy: googleMaps.places.RankBy.DISTANCE,
                types: ['fire_station']
              }, (places, status) => {
                resolve(places.length >= 6);
              })
            }
          );
        }

        loadGoogleMapsAPI().then((googleMaps) => {
          return Promise.all(predictions.map(prediction => geocodeByAddress(prediction.description)
            .then((results) => getLatLng(results[0]))
            .then(({lat, lng}) => countPlaces({
              lat, lng
            }, googleMaps))
            )).then(stencil => {
                console.log("stencil", stencil);
                const formattedSuggestion = structured_formatting => ({
                  mainText: structured_formatting.main_text,
                  secondaryText: structured_formatting.secondary_text,
                })

                const {highlightFirstSuggestion} = that.props

                that.setState({
                  autocompleteItems: predictions.map((p, idx) => ({
                    suggestion: p.description,
                    placeId: p.place_id,
                    active: highlightFirstSuggestion && idx === 0 ? true : false,
                    index: idx,
                    formattedSuggestion: formattedSuggestion(p.structured_formatting),
                  })),
                });
              });
            }).catch((error) => {
              console.log(error)
            });
    }
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
        if (status === googleMaps.places.PlacesServiceStatus.OK) {
          places.forEach(place => {
            bounds.extend(JSON.parse(JSON.stringify(place.geometry.location)));
          });
          this.props.changeLocation(location, places, JSON.parse(JSON.stringify(bounds)));
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
          ref={ ref => {this.autocomplete = ref} }
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
