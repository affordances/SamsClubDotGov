import React from 'react';
import './App.css';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

class MapComponent extends React.Component {
  componentDidUpdate = () => {
    setTimeout( () => {
      if (this.map) {
        this.map.fitBounds(this.props.bounds);
      }
    }, 0)
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
        defaultZoom={16}
        center={this.props.center}
      >
        <Marker position={this.props.center} />
        {this.props.places && this.props.places[3] && <Marker position={JSON.parse(JSON.stringify(this.props.places[3].geometry.location))} />}
        {this.props.places && this.props.places[6] && <Marker position={JSON.parse(JSON.stringify(this.props.places[6].geometry.location))} />}
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
