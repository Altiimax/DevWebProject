import React, { Component, Table } from "react";
import { Link } from "react-router-dom";
import Greet from "./Greetings";
import "../css/Profile.css";
import AddTools from "./AddTools";
import MyTools from "./MyTools";
import MyGroups from "./MyGroups";
/**
 * This component is used to display the account informations
 * of the member.
 * @param
 */

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    document.getElementById("homeNav").style.display = "block";
    document.getElementById("myGroupsNav").style.display = "block";
    document.getElementById("myToolsNav").style.display = "block";
    document.getElementById("myProfileNav").style.display = "block";
    document.getElementById("signUpNav").style.display = "none";
    document.getElementById("signInNav").style.display = "none";
    document.getElementById("signOutNav").style.display = "block";
  };

  //render les tables en claire avec de fausses infos, il faudra y mettre les infos de profil
  //et mettre le tout dans un side bar pour display que ce qu'il faut.
  render() {
    return (
      <div className="myProfile">
        <div className="container">
          <Greet className="error" name="Host" />
          <AddTools />
          <MyTools />
          <MyGroups />
        </div>
      </div>
    );
  }
}

export default Profile;

/*
<div className="profilPage">
        <div className="buttonsProfile">
          <button className="myToolsButton">
            <Link to="/" className="FormField_Link">
              Go back to the Menu
            </Link>
          </button>
          <div className="divider" />
          <button className="myToolsButton">
            <Link to="/help" className="FormField_Link">
              My Tools
            </Link>
          </button>
          <div className="divider" />
          <button className="myGroupsButton">
            <Link to="/help" className="FormField_Link">
              My groups
            </Link>
          </button>
          <div className="divider" />
          <button className="helpButton">
            <Link to="/help" className="FormField_Link">
              Help
            </Link>
          </button>
          <div className="divider" />
          <button className="myProfileButton">
            <Link to="/help" className="FormField_Link">
              Parameters
            </Link>
          </button>
        </div>
      </div>
      */
