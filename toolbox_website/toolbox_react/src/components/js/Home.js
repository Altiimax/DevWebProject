import React from "react";
import "../css/Home.css";
import { Form, Col } from "react-bootstrap";
//import logo from "../../nut.svg";

export default function Home() {
  return (
    <div className="home">
      <div className="container">
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
    </div>
  );
}
//<img src={logo} className="App-logo" alt="logo" />
