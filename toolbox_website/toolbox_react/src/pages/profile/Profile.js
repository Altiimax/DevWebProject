import React, { Component } from "react";
import PropTypes from "prop-types";
import { apiRequest } from "../../api/apiRequest.js";
import tokenIsValid, {userFromToken} from "../../utils";
import history from "../../history";
import AddTools from "../../components/AddTools/AddTools.js";
import MyGroups from "../../components/MyGroups/MyGroups.js";
import MyTools from "../../components/MyTools/MyTools.js";
import CreateGroup from "../../components/CreateGroup/CreateGroup.js";
import "./Profile.css";
import icon from "../../assets/toolBox_logo.png";

/**
 * This component is used to display the account informations
 * of the member.
 */
class Profile extends Component {

  getMyToolsApi() {
    let endpoint = "/api/tools/";

    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let resp = JSON.parse(this.responseText);
          let toolList = "";
          for (let i in resp) {
            console.log(resp[i]);
            //il faut rajouter les images via le props 'img' j'ai des problèmes lors de l'import je sais pas pq!
            toolList +=
              "<MyTools name='" +
              resp[i].toolName +
              "' price='" +
              resp[i].toolPrice +
              "'/>";
          }
          //je ne peux pas utiliser document.getElementById ici mais seulement dans componentDidMount
          //document.getElementById("myTools").innerHTML += toolList;
          console.log(toolList);
          console.log(resp);
        }
      }
    });

    req.send();
  }

  componentDidMount() {
    //del this comment in master
    if(tokenIsValid()){
      this.getUserProfileAPIRequest(userFromToken().id);
    }
    else {
      history.push('/');
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
        <AddTools />
        <CreateGroup />
        <MyGroups />
        <MyTools img={icon} name="trorororo" price="8800" />
        <div className="myTools"></div>
        <button onClick={this.getMyToolsApi}>MyTools</button>
      </div>
    );
  }
}

export default Profile;

