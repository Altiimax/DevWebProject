import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./Search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state={
        data: this.props.data,
    }
  }

  componentDidMount = () =>{
    let tabData = this.state.data;
    let tabBody = "";
    for (let i in tabData) {
      tabBody +=
        "<tr><td>" +
        tabData[i].id_groupName +
        "</td><td>" +
        tabData[i].groupType +
        "</td><td>" +
        tabData[i].groupDescription+
        "</td><td>" +
        tabData[i].town.townName +
        "</td></tr>";
    }
    document.getElementById('data').innerHTML = tabBody;
  }

  render() {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Group Type</th>
            <th>Group Description</th>
            <th>Town</th>
          </tr>
        </thead>
        <tbody id="data">
        </tbody>
      </Table>
    );
  }
}

export default Search;
