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
      toolName :"",
      townName:"",
      data:[ {
        "id_groupName": "TestGroup1",
        "groupType": "public",
        "groupDescription": null,
        "groupRange": 50,
        "town": {
          "id_town": 1,
          "postCode": 1330,
          "townName": "Rixensart",
          "id_countryCode": "BE"
        }
      }]
      }
  }

apiFindTools = () => {
let self= this;
let endpoint = "/api/search/?what='"+self.state.toolName+"'&where='"+self.state.townName+"'";

    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let rep = JSON.parse(this.responseText);
          if(self.state.data.length === 0){
            alert("Tool not found");
          }
          else{
            console.log(self.state.data)
            ReactDOM.render(<Search data={self.state.data} />, document.getElementById("list"));
          }
        }
      }
    });

    req.send();
console.log(this.state.toolName);
console.log(this.state.townName);
}

handleChange = (e) => {
  let target = e.target;
  let value = target.value;
  let name = target.name;
  this.setState({ [name]: value });
};

handleSubmit = (e) =>{
e.preventDefault();
this.apiFindTools();
}

  render() {
    return (
      <div className="searchForm">
        <h1 className="formTitle">Find nearby tools</h1>
        <Form className="baseForm">
          <Form.Group>
            <Form.Label>Which tool?</Form.Label>
            <Form.Control
              type="text"
              name="toolName"
              placeholder="Wrench, saw, screwdriver, ..."
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Where?</Form.Label>
            <Form.Control type="text" placeholder="Select a city by name" name="townName" onChange={this.handleChange}/>
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
            <button className="searchButton" type="submit"  onClick={this.handleSubmit}>
              Search
            </button>
          </div>
        </Form>
      </div>
    );
  }
}

export default FindTools;
