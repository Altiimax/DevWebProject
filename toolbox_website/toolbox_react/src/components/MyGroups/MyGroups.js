import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Table } from "react-bootstrap";
import CreateGroup from "../CreateGroup/CreateGroup.js";
import "./MyGroups.css";

function MyGroups(props) {
  const [data] = useState(props.data);
  let tabData = data;
  let tabBody = "";
  for (let i in data) {
    let admin = "";
    //Obliger de mettre deux if a la suite a cause du useEffect qui accepte pas le if else, je sais pas pq!
    if (tabData[i].groupAdmin) {
      admin = "Yes";
    }
    if (!tabData[i].groupAdmin) {
      admin = "No";
    }
    tabBody +=
      "<tr><td>" +
      admin +
      "</td><td>" +
      tabData[i].group.id_groupName +
      "</td><td>" +
      tabData[i].group.groupType +
      "</td><td>location</td><td>" +
      tabData[i].group.groupRange +
      "</td></tr>";
  }
  useEffect(() => {
    document.getElementById("content").innerHTML = tabBody;
  });

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

  function displayPopup(){
    let p = <CreateGroup showPopUp={true}/>;
    ReactDOM.render(p, document.getElementById("newGroupPopup"));
  }

  document.getElementById("profileSection").innerHTML = "My Groups";
  return (
    <div>
      <button id="newGroupBtn" onClick={displayPopup}>New Group</button>
      <div id="newGroupPopup"></div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>
              <span className="tableHead">Admin of the Group</span>
              <div className="sortButtons">
                <span onClick={sortTab(0, "asc", tabData)}>▲</span>
                <span onClick={sortTab(0, "desc", tabData)}>▼</span>
              </div>
            </th>
            <th>
              <span className="tableHead">Name of the group</span>
              <div className="sortButtons">
                <span onClick={sortTab(0, "asc", tabData)}>▲</span>
                <span onClick={sortTab(0, "desc", tabData)}>▼</span>
              </div>
            </th>
            <th>
              <span className="tableHead">Type</span>
              <div className="sortButtons">
                <span onClick={sortTab(1, "asc")}>▲</span>
                <span onClick={sortTab(1, "desc")}>▼</span>
              </div>
            </th>
            <th>
              <span className="tableHead">Location</span>
              <div className="sortButtons">
                <span onClick={sortTab(2, "asc")}>▲</span>
                <span onClick={sortTab(2, "desc")}>▼</span>
              </div>
            </th>
            <th>
              <span className="tableHead">Number of member</span>
              <div className="sortButtons">
                <span onClick={sortTab(3, "asc")}>▲</span>
                <span onClick={sortTab(3, "desc")}>▼</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody id="content"></tbody>
      </Table>
    </div>
  );
}

export default MyGroups;
