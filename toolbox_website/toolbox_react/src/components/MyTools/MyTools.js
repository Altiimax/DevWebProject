import React, { Component } from "react";
import { Table } from "react-bootstrap";

export default class MyTools extends Component {
  render() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Owner</th>
              <th>Renting infos</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Image not found</td>
              <td>Screwdriver</td>
              <td>Bob</td>
              <td>
                Was borrowed on 20/04/2012 and must be given back before
                24/05/2012
              </td>
              <td>Used</td>
            </tr>
            <tr>
              <td>Image not found</td>
              <td>Screwdriver</td>
              <td>Bob</td>
              <td>
                Was borrowed on 20/04/2012 and must be given back before
                24/05/2012
              </td>
              <td>Used</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
