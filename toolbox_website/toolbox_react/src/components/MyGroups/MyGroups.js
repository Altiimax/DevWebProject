import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { apiRequest } from "../../api/apiRequest.js";
import { userFromToken } from "../../utils";
import CreateGroup from "../CreateGroup/CreateGroup.js";
import GroupDetail from "../GroupDetail/GroupDetail.js";
import { Table } from "react-bootstrap";
import "./MyGroups.css";

function MyGroups() {

  useEffect(() => {
    document.getElementById("myGroupProfile").style.display="initial";
    document.getElementById("GroupDetail").style.display="none";
    getMyGroupsApiRequest();
    document.getElementById("profileSection").innerHTML = "My Groups";
  });

  function getMyGroupsApiRequest(){
    let endpoint = "/api/persons/" + userFromToken().id + "/groups/";

    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let resp = JSON.parse(this.responseText);
          displayGroups(resp);
        }
      }
    });

    req.send();
  }

  function displayGroupDetail(group){
    let gpD = <GroupDetail groupObj={group} content={'profile'}/>;
    ReactDOM.render(gpD, document.getElementById("GroupDetail"));
  }

  function displayGroups(tabData){
    let tabBody = [];
    let key_g = 0;
    for (let g of tabData) {
      key_g ++;
      let admin = (g.groupAdmin)? "yes": "No";
      tabBody.push(
        <tr key={key_g} onClick={() => displayGroupDetail(g.group)}>
          <td>{admin}</td>
          <td>{g.group.id_groupName}</td>
          <td>{g.group.groupType}</td>
          <td>{g.group.town.townName}</td>
        </tr>
      );
    };
    ReactDOM.render(tabBody, document.getElementById("content"));
  }

  function refreshGroupList(){
    getMyGroupsApiRequest();
  }

  function displayPopup(){
    let p = <CreateGroup showPopUp={true} refreshGroupList={refreshGroupList}/>;
    ReactDOM.render(p, document.getElementById("newGroupPopup"));
  }

  
  return (
    <div>
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
      <div id="GroupDetail">
      </div>
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

            