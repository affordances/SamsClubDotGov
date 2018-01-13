import React from 'react';
import './App.css';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

class MapComponent extends React.Component {
  componentDidUpdate = () => {
    if (this.map) {
      this.map.fitBounds(JSON.parse(JSON.stringify(this.props.bounds)));
      console.log(this.props.center);
      console.log(this.props.bounds);
    }
  }

  render() {
    const Map = withGoogleMap((props) =>
      <GoogleMap
        ref={(ref) => {this.map = ref;}}
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
        <Marker position={this.props.center} />
        {this.props.bounds && <Marker position={ {lat: this.props.bounds.north, lng: this.props.bounds.east} } />}
        {this.props.bounds && <Marker position={ {lat: this.props.bounds.north, lng: this.props.bounds.west} } />}
        {this.props.bounds && <Marker position={ {lat: this.props.bounds.south, lng: this.props.bounds.east} } />}
        {this.props.bounds && <Marker position={ {lat: this.props.bounds.south, lng: this.props.bounds.west} } />}
        {this.props.places && <Marker position={JSON.parse(JSON.stringify(this.props.places[0].geometry.location))} />}
        {this.props.places && <Marker position={JSON.parse(JSON.stringify(this.props.places[1].geometry.location))} />}
      </GoogleMap>

    ); return (
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

export default MapComponent;
