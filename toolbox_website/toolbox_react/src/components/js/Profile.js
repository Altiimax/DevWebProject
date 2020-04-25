import React, { Component } from "react";
import PropTypes from "prop-types";
import { apiRequest } from "../../api/apiRequest.js";

import "../css/Profile.css";

/**
 * This component is used to display the account informations
 * of the member.
 */
class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.user_id !== 0) {
      this.getUserProfileAPIRequest(this.props.user_id);
    } else {
      document.getElementById("profile").innerHTML =
        "You must be logged-in to access this page !";
    }
  }

  getUserProfileAPIRequest(id) {
    let endpoint = "/api/persons/";

    let req = new apiRequest();
    req.open("GET", `${endpoint}${id}/`);

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let profile = JSON.parse(this.responseText)[0];
          document.getElementById("profile").innerHTML =
            "Welcome " + profile.firstName + " " + profile.lastName;
        }
      }
    });

    req.send();
  }

  //render les tables en claire avec de fausses infos, il faudra y mettre les infos de profil
  //et mettre le tout dans un side bar pour display que ce qu'il faut.
  render() {
    return (
      <div className="Profile">
        <h1> Temporary Profile </h1>
        <section id="profile"></section>
      </div>
    );
  }
}

export default Profile;

Profile.propTypes = {
  user_id: PropTypes.number.isRequired,
};
