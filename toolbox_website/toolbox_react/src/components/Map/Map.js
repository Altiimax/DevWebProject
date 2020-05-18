import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

import "./Map.css";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const mapcontainerStyle = {
  width: "100%",
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, //Hides or shows InfoWindows
    activeMarker: {}, // Show active marker on click
    selectedPlace: {}, //show infowindow of selected marker
  };

  onMarlerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };
  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <div id="mapContainer">
        <Map
          containerStyle={mapcontainerStyle}
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 50.850346,
            lng: 4.351721,
          }}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={"Kenyatta International Convention Centre"}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDW1S7ntQGxHWHtUU0KWG61Qc0tR-bo1Mk",
})(MapContainer);
