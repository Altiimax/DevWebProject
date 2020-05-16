import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { apiRequest } from "../../api/apiRequest.js";
import { userFromToken } from "../../utils";
import CreateGroup from "../CreateGroup/CreateGroup.js";
import { Table } from "react-bootstrap";
import "./MyGroups.css";

function MyGroups(props) {

  useEffect((data) => {
    getMyGroupsApiRequest();
  });

  function getMyGroupsApiRequest(){
    let endpoint = "/api/persons/" + userFromToken().id + "/groups/";

    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let resp = JSON.parse(this.responseText);
          displayTable(resp);
        }
      }
    });

    req.send();
  }

  function displayTable(tabData){
    let tabBody = "";
    for (let i in tabData) {
      let admin = (tabData[i].groupAdmin)? "yes": "No";
      tabBody +=
        "<tr><td>" +
        admin +
        "</td><td>" +
        tabData[i].group.id_groupName +
        "</td><td>" +
        tabData[i].group.groupType +
        "</td><td>" + 
        tabData[i].group.town.townName +
        "</td></tr>";
    };
    document.getElementById("content").innerHTML = tabBody;
  }

  function refreshGroupList(){
    getMyGroupsApiRequest();
  }

  function displayPopup(){
    let p = <CreateGroup showPopUp={true} refreshGroupList={refreshGroupList}/>;
    ReactDOM.render(p, document.getElementById("newGroupPopup"));
  }

  document.getElementById("profileSection").innerHTML = "My Groups";
  return (
    <div id="myGroupProfile">
      <button id="newGroupBtn" onClick={displayPopup}>Create new Group</button>
      <div id="newGroupPopup"></div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>
              <span id="tbHGroupAdmin" className="tableHead">Admin</span>
            </th>
            <th>
              <span id="tbHGroupName" className="tableHead">Name</span>
            </th>
            <th>
              <span id="tbHGroupType" className="tableHead">Type</span>
            </th>
            <th>
              <span id="tbHGroupLocation" className="tableHead">Location</span>
            </th>
          </tr>
        </thead>
        <tbody id="content"></tbody>
      </Table>
    </div>
  );
}

export default MyGroups;


/* TRI - mis de coté pour le moment
  //pour le sort il faudrait refresh le component une fois sorted!
  function compare(a, b) {
    //if a & b are numbers
    if (!isNaN(a) && !isNaN(b)) {
      return a - b;
    } //if a & b are strings
    else {
    }
  }
  function sortTab(col, sens, toSort) {
    if ((col === 3) & (sens === "asc")) {
      return compare();
    }
  }

<div className="sortButtons">
  <span onClick={sortTab(0, "asc", tabData)}>▲</span>
  <span onClick={sortTab(0, "desc", tabData)}>▼</span>
</div>
*/

            