import React, { Component } from "react";
import { Form, Col } from "react-bootstrap";
import "../css/FindTools.css";

class FindTools extends Component {
  render() {
    return (
      <div>
        <h1 className="formTitle">Find nearby tools</h1>
        <Form className="baseForm">
          <Form.Group>
            <Form.Label>Which tool?</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wrench, saw, screwdriver, ..."
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Where?</Form.Label>
            <Form.Control type="text" placeholder="Select a city by name" />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>From</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>To</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Form.Row>
          <button className="searchButton" type="submit">
            Research
          </button>
        </Form>
      </div>
    );
  }
}

export default FindTools;
