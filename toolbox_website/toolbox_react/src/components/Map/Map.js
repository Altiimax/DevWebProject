import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

import "./Map.css";

const mapStyles = {
  width: '100%',
  height: '100%',
};

let groupsMok = [
  {
    id_groupName: "TestGroup1",
    groupType: "public",
    groupDescription: "This is the description of testGroup1",
    groupRange: 50,
    town: {
      id_town: 1,
      postCode: 1330,
      townName: "Rixensart",
      lat:  50.7122504,
      lng: 4.5216455,
      id_countryCode: "BE",
    },
  },
  {
    id_groupName: "TestGroup2",
    groupType: "public",
    groupDescription: "This is the description of testGroup2",
    groupRange: 50,
    town: {
      id_town: 1,
      postCode: 1330,
      townName: "Wavre",
      lat:  50.7162425,
      lng: 4.60845,
      id_countryCode: "BE",
    },
  },
];



export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, //Hides or shows InfoWindows
      activeMarker: {},         // Show active marker on click
      selectedPlace: {},        //show infowindow of selected marker
      groupsToShow: groupsMok,
    };
    this.showPopUp = true;
  }

  componentDidMount(){
   //pass 
  }

  componentDidUpdate(){
    //pass 
   }

  onMarkerClick = (props, marker, e) => {
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

  markers() {
    let markers = [];
    let key_m = 0;
    for (let g of this.state.groupsToShow){
      key_m ++;
      markers.push(
        <Marker
          key={key_m}
          onClick={this.onMarkerClick}
          title={g.id_groupName}
          description={g.groupDescription}
          position={{lat: g.town.lat, lng: g.town.lng}}
        />
      );
    }
    return markers;
  }

  render() {
    return (
      <Map
        style={mapStyles}
        google={this.props.google}
        zoom={12}
        initialCenter={{
          lat: this.state.groupsToShow[0].town.lat,
          lng: this.state.groupsToShow[0].town.lng,
        }}
      >
        {this.markers()}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div className="mapInfoWindow">
            <h4>{this.state.selectedPlace.title}</h4>
            <div>{this.state.selectedPlace.description}</div>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDW1S7ntQGxHWHtUU0KWG61Qc0tR-bo1Mk",
})(MapContainer);
