import React, { Component } from "react";
import { Table } from "react-bootstrap";

export default class MyGroups extends Component {
  render() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Name of the group</th>
              <th>Location</th>
              <th>Number of member</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Test</td>
              <td>Test</td>
              <td>Test</td>
            </tr>
            <tr>
              <td>Test</td>
              <td>Test</td>
              <td>Test</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
