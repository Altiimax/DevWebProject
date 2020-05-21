import React, { Component } from "react";
import { Form /*Col*/ } from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead';
import { apiRequest } from "../../api/apiRequest.js";
import Search from "../Search/Search.js";
import ReactDOM from "react-dom";

import "./FindTools.css";

//https://github.com/ericgio/react-bootstrap-typeahead //TODO mettre dans refs

class FindTools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      townList: [],
      toolList: [],
      toolName: "",
      townName: "",
    };
  }

  componentDidMount(){
    this.getAllTownsApiRequest();
    this.getAllToolsApiRequest();
  }

  getAllTownsApiRequest(){
    let endpoint = `/api/towns/`;
    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    let self = this;

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          self.setState({townList: JSON.parse(this.responseText)});
        }
      }
    });

    req.send();
  };

  getAllToolsApiRequest(){
    let endpoint = `/api/tools/`;
    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    let self = this;

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) { 
          self.setState({toolList: JSON.parse(this.responseText)});
        }
      }
    });

    req.send();
  };


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
          if (rep.length === 0) {
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
  };

  handleSubmit = (e) => {
    ReactDOM.render(" ",document.getElementById("list"));
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
            <Typeahead
              id="whatInput"
              onChange={selected => {
                                      try{ this.setState({ toolName: selected[0].toolName })}
                                      catch(e){}
                                    }
                        }
              labelKey="toolName"
              options={this.state.toolList}
              placeholder="Wrench, saw, screwdriver, ..."
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Where?</Form.Label>
            <Typeahead
              id="whereInput"
              onChange={selected => {
                            try{ this.setState({ townName: selected[0].townName })}
                            catch(e){}
                          }
              }
              labelKey="townName"
              options={this.state.townList}
              placeholder="Select a city by name"
            />
          </Form.Group>

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
