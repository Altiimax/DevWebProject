import React, { Component } from "react";
import { apiRequest } from "../../api/apiRequest.js";
import tokenIsValid, { userFromToken } from "../../utils";
import history from "../../history";
import MyGroups from "../../components/MyGroups/MyGroups.js";
import MyTools from "../../components/MyTools/MyTools.js";

import "./Profile.css";
import ReactDOM from "react-dom";
/**
 * This page is used to display the account informations
 * of the member.
 */
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 0,
    };
  }

  componentDidMount() {
    if (tokenIsValid()) {
      this.getUserProfileAPIRequest(userFromToken().id);
    } else {
      history.push("/");
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
          document.getElementById("userNameDisplay").innerHTML =
            "Welcome " + profile.firstName + " " + profile.lastName;
        }
      }
    });

    req.send();
  }

  getMyGroupsApi = (id_pers) => {
    let endpoint = "/api/persons/" + id_pers + "/groups/";

    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let resp = JSON.parse(this.responseText);
          ReactDOM.render(
            <MyGroups data={resp} />,
            document.getElementById("profileContentDisplay")
          );
          document.getElementById("profileContentDisplay").style.display = "flex";
        }
      }
    });

    req.send();
  };

  displayMyTools(id_pers){
    let toolList= <MyTools user_id={id_pers} />
    ReactDOM.render(toolList, document.getElementById("profileContentDisplay"));
  }

  render() {
    return (
      <div className="Profile" id="main">
        <div id="profileContentWrapper">
          <div id="navBar">
            <button onClick={() => this.displayMyTools(userFromToken().id)}>My Tools</button>
            <button onClick={() => this.getMyGroupsApi(userFromToken().id)}>My Groups</button>
            <button onClick={this.getMyProfileApi}>My Profile</button>
          </div>
          <div id="profileContent">
            <div id="profileTitle"> 
              <h1 id="profileSection"></h1>
            </div>
            <div id="profileContentDisplay"></div>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;