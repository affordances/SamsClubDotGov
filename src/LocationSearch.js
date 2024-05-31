import React from "react";
import "./App.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

class LocationSearch extends React.Component {
  state = {
    address: "",
  };

  handleSelect = (address) => {
    this.setState({
      address: address,
    });

    if (
      this.props.searchedLocations &&
      this.props.searchedLocations.find((x) => x.query === this.state.address)
    ) {
      const searchedLocation = this.props.searchedLocations.find(
        (x) => x.query === this.state.address
      );
      const query = searchedLocation.query;
      const address = searchedLocation.address;
      const location = searchedLocation.location;
      const places = searchedLocation.places;
      const bounds = searchedLocation.bounds;
      this.props.changeLocation(
        query,
        address,
        location,
        places,
        JSON.parse(JSON.stringify(bounds))
      );
      return;
    }

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.findPlaces({ lat, lng });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  findPlaces = (location) => {
    const googleMaps = window.google.maps;
    const placesService = new googleMaps.places.PlacesService(
      document.createElement("div")
    );
    const bounds = new googleMaps.LatLngBounds(location);

    placesService.search(
      {
        location: location,
        rankBy: googleMaps.places.RankBy.DISTANCE,
        types: ["fire_station"],
      },
      (places, status) => {
        if (
          status === googleMaps.places.PlacesServiceStatus.OK &&
          places.length >= 7
        ) {
          places = [places[0], places[6]];
          places.forEach((place) => {
            bounds.extend(JSON.parse(JSON.stringify(place.geometry.location)));
          });
          const address = [this.createAddress(), this.createAddress()];
          const query = this.state.address;
          this.props.changeLocation(
            query,
            address,
            location,
            places,
            JSON.parse(JSON.stringify(bounds))
          );
          const locationSearch = {
            query: query,
            address: address,
            location: location,
            places: places,
            bounds: bounds,
          };
          this.props.updateSearchedLocations(locationSearch);
        } else {
          const errorText =
            "Sorry, we don't have a store in this area! Please try a different location.";
          this.props.changeLocation(null, null, null, null, null, errorText);
        }
      }
    );
  };

  handleChange = (address) => {
    this.setState({
      address,
    });
  };

  createAddress = () => {
    const streetNames = [
      "Second",
      "Third",
      "First",
      "Fourth",
      "Park",
      "Fifth",
      "Main",
      "Sixth",
      "Oak",
      "Seventh",
      "Pine",
      "Maple",
      "Cedar",
      "Eighth",
      "Elm",
      "View",
      "Washington",
      "Ninth",
      "Lake",
      "Hill",
    ];
    const streetTypes = ["St", "Ave"];
    const number = Math.floor(Math.random() * 1000) + 1;
    const street = streetNames[Math.floor(Math.random() * streetNames.length)];
    const streetType =
      streetTypes[Math.floor(Math.random() * streetTypes.length)];
    const cityAndState = this.state.address.replace(", USA", "");
    const address = {
      number: number,
      street: street,
      streetType: streetType,
      cityAndState: cityAndState,
    };
    return address;
  };

  render() {
    const inputProps = {
      type: "text",
      value: this.state.address.replace(", USA", ""),
      onChange: this.handleChange,
      autoFocus: true,
      placeholder: "Enter your city",
      spellCheck: false,
      name: "input",
      id: "input-id",
    };

    const cssClasses = {
      root: "form-group",
      input: "form-control",
      autocompleteContainer: "autocomplete-container",
    };

    const autocompleteItem = ({ suggestion }) => (
      <div>{suggestion.replace(", USA", "")}</div>
    );

    const options = {
      types: ["(cities)"],
      componentRestrictions: { country: "us" },
    };

    const shouldFetchSuggestions = ({ value }) => value.length > 2;

    const onError = (status) => {
      console.log(
        "Error happened while fetching suggestions from Google Maps API",
        status
      );
    };

    return (
      <div className="form-group">
        <PlacesAutocomplete
          className="form-control"
          ref={(ref) => {
            this.autocomplete = ref;
          }}
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
