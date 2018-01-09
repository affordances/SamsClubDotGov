import React from 'react';
import './App.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox"

class Scheduler extends React.Component {
  render() {
    return (
      <div>
        You gotta make an appointment for that!
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
    const Map = withScriptjs(withGoogleMap((props) =>
      <GoogleMap
        options={{
          styles: [
            {
              featureType: "all",
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

    )); return (
      <div>
        <LocationSearchBox
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
         />

        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div className='loadingElement'/>}
          containerElement={<div className='containerElement'/>}
          mapElement={<div className='mapElement'/>}
        />
      </div>
    );
  }
}

class LocationSearchBox extends React.Component {
  refs = {}

  state = {
    places: [],
  }

  onSearchBoxMounted = (ref) => {
    this.searchBox = ref;
  }

  onPlacesChanged = () => {
    const places = this.refs.searchBox.getPlaces();

    this.setState({
      places,
    });
  }

  render() {
    return (
      <div data-standalone-searchbox="">
        <StandaloneSearchBox
          ref={this.onSearchBoxMounted}
          bounds={this.bounds}
          onPlacesChanged={this.props.onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Your location"
          />
        </StandaloneSearchBox>
        <ol>
          {this.state.places.map(({ place_id, formatted_address, geometry: { location } }) =>
            <li key={place_id}>
              {formatted_address}
              {" at "}
              ({location.lat()}, {location.lng()})
            </li>
          )}
        </ol>
      </div>
    );
  }
}

LocationSearchBox = withScriptjs(LocationSearchBox);

export default Scheduler;
