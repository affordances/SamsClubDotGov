import React from 'react';
import './App.css';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

class MapComponent extends React.Component {
  componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      })
    }

  render() {
    console.log(this.props.center);
    if(this.props.places){console.log(this.props.places[0]);}
    if(this.props.places){console.log(this.props.places[1]);}
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
        defaultZoom={13}
        center={this.props.center}
      >
        <Marker position={this.props.center} />
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
