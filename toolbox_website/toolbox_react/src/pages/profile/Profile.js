import React, { Component } from "react";
import PropTypes from "prop-types";
import { apiRequest } from "../../api/apiRequest.js";
import tokenIsValid, { userFromToken } from "../../utils";
import history from "../../history";
import AddTools from "../../components/AddTools/AddTools.js";
import MyGroups from "../../components/MyGroups/MyGroups.js";
import MyTools from "../../components/MyTools/MyTools.js";
import CreateGroup from "../../components/CreateGroup/CreateGroup.js";
import "./Profile.css";
import icon from "../../assets/toolBox_logo.png";
import ReactDOM from "react-dom";
/**
 * This component is used to display the account informations
 * of the member.
 */
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 0,
      groupData: "",
      data: "",
    };
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

  getMyGroupsApi = (id_pers) => {
    if (id_pers === 0) {
      document.getElementById("displayInfos").innerHTML =
        "You must be logged to acces thoses informations!";
      document.getElementById("displayInfos").style.display = "flex";
    } else {
      let endpoint = "/api/persons/" + id_pers + "/groups";

      let req = new apiRequest();
      req.open("GET", `${endpoint}`);

      req.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            let resp = JSON.parse(this.responseText);
            console.log(resp);
            console.log(this.responseText);
            ReactDOM.render(
              <MyGroups data={resp} />,
              document.getElementById("displayInfos")
            );
            document.getElementById("displayInfos").style.display = "flex";
          }
        }
      });

      req.send();
    }
  };

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
          ReactDOM.render(toolList, document.getElementById("displayInfos"));
          document.getElementById("displayInfos").style.display = "flex";
        }
      }
    });

    req.send();
  }

  //render les tables en claire avec de fausses infos, il faudra y mettre les infos de profil
  //et mettre le tout dans un side bar pour display que ce qu'il faut.
  render() {
    return (
      <div className="Profile" id="main">
        <h1> Temporary Profile </h1>
        <section id="profile"></section>
        <div className="contentProfile" id="displayInfos"></div>
        <AddTools />
        <CreateGroup />
        <span className="myTools">
          <button className="addTools" onClick={console.log("ajouter")}>
            Add tools
          </button>
          <MyTools
            picture={icon}
            name="Nom De L'objet"
            price="8800"
            desc="Description de l'objet"
          />
          <MyTools picture={icon} name="Nom De L'objet" price="20" />
        </span>
        <span className="myGroups" id="ici"></span>
        <div className="sidenav" id="side">
          <a
            className="closebtn"
            onClick={function closeNav() {
              document.getElementById("side").style.width = "0";
              document.getElementById("opbtn").style.left = "0";
              document.getElementById("main").style.marginLeft = "10px";
            }}
          >
            ×
          </a>
          <button onClick={this.getMyToolsApi}>MyTools</button>
          <button onClick={() => this.getMyGroupsApi(1)}>MyGroups</button>
          <button onClick={this.getMyProfileApi}>MyProfile</button>
        </div>
        <button
          className="openbtn"
          id="opbtn"
          onClick={function openNav() {
            document.getElementById("side").style.width = "120px";
            document.getElementById("opbtn").style.left = "120px";
            document.getElementById("main").style.marginLeft = "150px";
          }}
        >
          ||
        </button>
      </div>
    );
  }
}
export default Profile;
