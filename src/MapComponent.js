import React from 'react';
import './App.css';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

class MapComponent extends React.Component {

  componentDidUpdate = () => {
    setTimeout( () => {
      if (this.map && this.props.bounds) {
        this.map.fitBounds(this.props.bounds);
      }
    }, 0)
  }

  componentDidMount = () => {
    setTimeout( () => {
      if (this.map && this.props.bounds) {
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
          gestureHandling: 'greedy',
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
        {this.props.places && <Marker label={'1'} position={JSON.parse(JSON.stringify(this.props.places[0].geometry.location))} />}
        {this.props.places && <Marker label={'2'} position={JSON.parse(JSON.stringify(this.props.places[1].geometry.location))} />}
      </GoogleMap>

    ); return (
      <div>
        {(this.props.errorText) ?
          <div className='map-error-text'>
            {this.props.errorText}
          </div> :
          <Map
            loadingElement={<div className='loadingElement'/>}
            containerElement={<div className='containerElement'/>}
            mapElement={<div className='mapElement'/>}
          />
        }
      </div>
    );
  }
}

export default MapComponent;
