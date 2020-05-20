import React, { Component } from "react";
import { Form /*Col*/ } from "react-bootstrap";
import "./FindTools.css";
import { apiRequest } from "../../api/apiRequest.js";
import Search from "../Search/Search.js";
import ReactDOM from "react-dom";

class FindTools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolName: "",
      townName: "",
      validated: false,
    };
  }

  apiFindTools = () => {
    let self = this;
    let endpoint =
      "/api/search/?what='" +
      self.state.toolName +
      "'&where='" +
      self.state.townName +
      "'";

    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let rep = JSON.parse(this.responseText);
          console.log(rep);
          if (rep.length === 0) {
            console.log("Tool not found");
          } else {
            ReactDOM.render(
              <Search data={rep} />,
              document.getElementById("list")
            );
          }
        }
      }
    });

    req.send();
    console.log(this.state.toolName);
    console.log(this.state.townName);
  };

  handleChange = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    const form = e.currentTarget;
    if(form.checkValidity() === false){
        e.preventDefault();
        e.stopPropagation();
    }
    this.setState({validated : true});
        e.preventDefault();
        this.apiFindTools();
      };

  render() {
    return (
      <div className="searchForm">
        <h1 className="formTitle">Find nearby tools</h1>
        <Form className="baseForm" noValidate validated={this.state.validated}>
          <Form.Group>
            <Form.Label>Which tool?</Form.Label>
            <Form.Control
              required
              type="text"
              name="toolName"
              placeholder="Wrench, saw, screwdriver, ..."
              onChange={this.handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Where?</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Select a city by name"
              name="townName"
              onChange={this.handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
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
            <button
              className="searchButton"
              type="submit"
              onClick={this.handleSubmit}
            >
              Search
            </button>
          </div>
        </Form>
      </div>
    );
  }
}

export default FindTools;
