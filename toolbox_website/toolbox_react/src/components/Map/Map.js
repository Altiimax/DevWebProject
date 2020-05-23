import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import GroupDetail from "../GroupDetail/GroupDetail.js";

import "./Map.css";

const mapStyles = {
  width: '100%',
  height: '100%',
};


export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, //Hides or shows InfoWindows
      activeMarker: {},         // Show active marker on click
      selectedPlace: {},        //show infowindow of selected marker
    };
    this.showPopUp = true;
  }

  displayGroupDetail = (group)=>{
    let gpD = <GroupDetail groupObj={group} content={'searchResult'}/>;
    ReactDOM.render(gpD, document.getElementById("homeGroupDetail"));
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
    for (let g of this.props.data){
      key_m ++;
      markers.push(
        <Marker
          key={key_m}
          title={g.id_groupName}
          description={g.groupDescription}
          position={{lat: g.town.lat, lng: g.town.lng}}
          onClick={() => this.displayGroupDetail(g)}
          //onHover={this.onMarkerClick}
        />
      );
    }
    if(markers[0] != null){return markers};
    return null;
  }

  center(){
    if(this.props.data[0] != null){
      return{
        lat: this.props.data[0].town.lat,
        lng: this.props.data[0].town.lng,
      }
    }
    return {
      lat: 50.844041,
      lng: 4.367202,
    };
  }

  render() {
    return (
      <Map
        style={mapStyles}
        google={this.props.google}
        zoom={10}
        initialCenter={this.center()}
        center={this.center()}
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
