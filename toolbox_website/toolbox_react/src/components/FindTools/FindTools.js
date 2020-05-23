import React, { Component } from "react";
import { Form /*Col*/ } from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead';
import { apiRequest } from "../../api/apiRequest.js";
import SearchResult from "../SearchResult/SearchResult.js";
import Map from "../Map/Map.js";
import ReactDOM from "react-dom";

import "./FindTools.css";


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
          let rep = JSON.parse(this.responseText);
          let onlyOnce = [];
          for(let e of rep){
              if (!onlyOnce.includes(e.townName)){
                  onlyOnce.push(e.townName);
              }
          }
          onlyOnce.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
          self.setState({townList: onlyOnce});
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
          let rep = JSON.parse(this.responseText);
          let onlyOnce = [];
          for(let e of rep){
              if (!onlyOnce.includes(e.toolName)){
                  onlyOnce.push(e.toolName);
              }
          }
          onlyOnce.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
          self.setState({toolList: onlyOnce});
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
          let onlyOnce = [];
          for(let g of rep){
            let isAlreadyIn = false;
            for(let go of onlyOnce){
              if(g.id_groupName === go.id_groupName){
                isAlreadyIn = true;
                break;
              }
            }
            if(!isAlreadyIn){
              onlyOnce.push(g);
            }
          }
          if (rep.length !== 0) {
            ReactDOM.unmountComponentAtNode(document.getElementById("homeGroupDetail"));
            ReactDOM.render(
              <SearchResult data={onlyOnce} />,
              document.getElementById("list")
            );
            ReactDOM.render(
              <Map data={onlyOnce} />,
              document.getElementById("searchMap")
            );
          }
          else{
            ReactDOM.unmountComponentAtNode(document.getElementById("homeGroupDetail"));
            ReactDOM.render(
              <div className="noResults">No Results</div>,
              document.getElementById("list")
            );
            ReactDOM.render(
              <Map data={onlyOnce} />,
              document.getElementById("searchMap")
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
                                      try{ this.setState({ toolName: selected[0] })}
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
                            try{ this.setState({ townName: selected[0] })}
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
