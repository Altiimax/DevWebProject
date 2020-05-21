import React, { Component } from "react";
import tokenIsValid, { userFromToken } from "../../utils";
import history from "../../history";
import MyGroups from "../../components/MyGroups/MyGroups.js";
import MyTools from "../../components/MyTools/MyTools.js";
import MyProfile from "../../components/MyProfile/MyProfile.js";

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
      //pass
    } 
    else {
      history.push("/");
    }
  }

  componentDidUpdate() {
    if (tokenIsValid()) {
      //pass
    } 
    else {
      history.push("/");
    }
  }

  getMyGroupsApi(id_pers){
    if (tokenIsValid()) {
      let groupList= <MyGroups/>
      ReactDOM.render(groupList, document.getElementById("profileContentDisplay"));
    } else {
      history.push("/");
    }
  };

  displayMyTools(id_pers){
    if (tokenIsValid()) {
      let toolList= <MyTools user_id={id_pers} />
      ReactDOM.render(toolList, document.getElementById("profileContentDisplay"));
    } else {
      history.push("/");
    }
  }

  getMyProfileApi= (id_pers) =>{
    if (tokenIsValid()) {
      let profileInfos= <MyProfile user_id={id_pers}/>
      ReactDOM.render(profileInfos, document.getElementById("profileContentDisplay"));
    } else {
      history.push("/");
    }
  }

  render() {
    return (
      <div className="Profile" id="main">
        <div id="profileContentWrapper">
          <div id="navBar">
            <button onClick={() => this.displayMyTools(userFromToken().id)}>My Tools</button>
            <button onClick={() => this.getMyGroupsApi(userFromToken().id)}>My Groups</button>
            <button onClick={() => this.getMyProfileApi(userFromToken().id)}>My Profile</button>
          </div>
          <div id="profileContent">
            <div id="profileTitle"> 
              <h1 id="profileSection"> </h1>
            </div>
            <div id="profileContentDisplay"></div>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;