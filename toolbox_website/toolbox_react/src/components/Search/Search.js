import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table } from "react-bootstrap";
import "./Search.css";
import GroupDetail from "../GroupDetail/GroupDetail.js";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  displayGroupDetail = (group)=>{
    let gpD = <GroupDetail groupObj={group} content={'searchResult'}/>;
    ReactDOM.render(gpD, document.getElementById("GroupDetail"));
  }

  componentDidMount = () => {
    let tabData = this.state.data;
    let tabBody = [];
    for (let i in tabData) {
      tabBody.push(
        <tr onClick={() => this.displayGroupDetail(tabData[i])}><td>
        {tabData[i].id_groupName}
        </td><td>
        {tabData[i].groupType}
        </td><td>
        {tabData[i].groupDescription}
        </td><td>
        {tabData[i].town.townName}
        </td></tr>)
    }
    ReactDOM.render(tabBody,document.getElementById("data"));    
  };

  render() {
    return (
      <div className="groupHasTool">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Group Type</th>
              <th>Group Description</th>
              <th>Town</th>
            </tr>
          </thead>
          <tbody id="data"></tbody>
        </Table>
        <div id="GroupDetail"></div>
      </div>
    );
  }
}

export default Search;
