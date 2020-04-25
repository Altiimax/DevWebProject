import React from "react";
import { Form, Col } from "react-bootstrap";

import "../css/Home.css";

export default function Home() {
  return (
    <div className="Home">
      <div className="SearchFrom">
        <h1 className="formTitle">Find nearby tools</h1>
        <Form className="baseForm">
          <Form.Group>
            <Form.Label>Which tool ?</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wrench, saw, screwdriver, ..."
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Where ?</Form.Label>
            <Form.Control type="text" placeholder="Select a city by name" />
          </Form.Group>
          {/* //TODO pour le moment on implémente pas cette fonctionalitée ;) 
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>From</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>To</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Form.Row>*/}
          <div className="searchButtonContainer">
            <button className="searchButton" type="submit">
              {" "}
              Search{" "}
            </button>
          </div>
        </Form>
      </div>

      <div className="QuickLook">Ceci est provisoire</div>
    </div>
  );
}
