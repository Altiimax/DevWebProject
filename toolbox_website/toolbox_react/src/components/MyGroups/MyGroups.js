import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./MyGroups.css";

function MyGroups(props) {
  const [data] = useState(props.data);
  let tabData = data;
  let tabBody = "";
  for (let i in data) {
    let admin = "";
    /* if (tabData.groupAdmin) {
      admin = "Yes";
    } else {
      admin = "No";
    }*/
    tabBody +=
      "<tr><td>yes</td><td>" +
      tabData[i].id_groupName +
      "</td><td>" +
      tabData[i].groupType +
      "</td><td>location</td><td>" +
      tabData[i].groupRange +
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
  return (
    <div>
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
