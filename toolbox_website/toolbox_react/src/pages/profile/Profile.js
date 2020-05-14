import React, { Component } from "react";
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
    let reponse = "";
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
  };

  getMyToolsApi(id_pers) {
    let endpoint = "/api/persons/" + id_pers + "/tools";

    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let resp = JSON.parse(this.responseText);
          let toolList = [];
          for (let i in resp) {
            //il faut rajouter les images via le props 'img' j'ai des problèmes lors de l'import je sais pas pq!
            toolList.push(
              <MyTools
                picture={resp[i].toolImages[0].image}
                name={resp[i].toolName}
                price={resp[i].toolPrice}
                desc={resp[i].toolDescription}
              />
            );
          }
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
        <h1 className="Greetings"> Temporary Profile </h1>
        <section className="Greetings" id="profile"></section>
        <div className="contentWrapper">
          <button className="addTools" onClick={console.log("ajouter")}>
            Add tools
          </button>
          <div className="contentProfile" id="displayInfos"></div>
        </div>
        <AddTools />
        <CreateGroup />
        <span className="myTools" id="ici">
          <MyTools
            picture={icon}
            name="Nom De L'objet"
            price="8800"
            desc="Description de l'objet"
          />
          <MyTools picture={icon} name="Nom De L'objet" price="20" />
        </span>
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
          <button onClick={() => this.getMyToolsApi(userFromToken().id)}>
            MyTools
          </button>
          <button onClick={() => this.getMyGroupsApi(userFromToken().id)}>
            MyGroups
          </button>
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
