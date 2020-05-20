import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { apiRequest } from "../../api/apiRequest.js";
import { userFromToken } from "../../utils";

import "./ToolOptions.css";

const initialStates = {
  displayed_groups: [],  
};

let user_groups = [];
let tool_groups = [];
let toChange = {};

class ToolOptions extends Component {
  constructor(props) {
    super(props);
    this.state = initialStates;
    this.showPopUp = true;
    this.compUpdated = 0;
  };

  componentDidMount(){
    this.getUserGroupsApiRequest();
    this.getToolGroupsApiRequest();
  }

  componentDidUpdate() {
    this.showPopUp = this.props.showPopUp;
    if(this.compUpdated === 1){
      this.getUserGroupsApiRequest();
      this.getToolGroupsApiRequest();
    }
    this.compUpdated++;
  };

  closePopUp = () => {
    this.showPopUp = false;
    this.setState(initialStates);
    this.compUpdated = 0;
  };

  getUserGroupsApiRequest(){
    let endpoint = `/api/persons/${userFromToken().id}/groups/`;
    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    let self = this;

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          user_groups = JSON.parse(this.responseText);
          self.groupsToHtml();
        }
      }
    });

    req.send();
  };

  getToolGroupsApiRequest(){
    let endpoint = `/api/tools/${this.props.toolId}/groups/`;
    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    let self = this;

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          tool_groups = JSON.parse(this.responseText);
          self.groupsToHtml();
        }
      }
    });

    req.send();

  };

  postToolGroupApiRequest(id_group){
    let endpoint = "/api/groups/tools/";
    let req = new apiRequest();
    req.open("POST", `${endpoint}`);
    req.contentType("json");

    //let self = this;
    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 201) {
        }
      }
    });

    let data = {
      id_tool: this.props.toolId,
      id_groupName: id_group
    }

    req.send(JSON.stringify(data));
  };


  deleteToolGroupApiRequest(id_group){
    let endpoint = `/api/groups/tools/?groupName=${id_group}&id_tool=${this.props.toolId}`;
    let req = new apiRequest();
    req.open("DELETE", `${endpoint}`);
    req.contentType("json");

    //let self = this;
    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 204) {
        }
      }
    });
    req.send();
  };
  
  groupsToHtml(){
    let groupsHtml = [];
    let key_g = 0;

    for(let ug of user_groups){
      let hasTool = <input type="checkbox" id={ug.group.id_groupName} name={ug.group.id_groupName} onChange={this.handleChange}></input>;
      for(let tg of tool_groups){
        if(ug.group.id_groupName === tg.group.id_groupName){
          hasTool = <input type="checkbox" id={ug.group.id_groupName} name={ug.group.id_groupName} defaultChecked onChange={this.handleChange}></input>;
        }
      }
      groupsHtml.push(
        <div key={key_g}>
          <label htmlFor={ug.group.id_groupName}>{ug.group.id_groupName}</label>
          {hasTool}
        </div>
      );
      key_g ++;
    }

    ReactDOM.render(groupsHtml, document.getElementById("toolGroups"));
  
  }


  handleChange = (e) => {
    let target = e.target;
    let checked = target.checked;
    let name = target.name;
    if(checked){
      if(!(name in toChange)){
        toChange[name] = true;
      }
      else{
        delete toChange[name];
      }
    }
    else{
      if(!(name in toChange)){
        toChange[name] = false;
      }
      else{
        delete toChange[name];
      }
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    for(let group in toChange){
      if(toChange[group]){
        this.postToolGroupApiRequest(group);
      }
      else{
        this.deleteToolGroupApiRequest(group);
      }
    }
    toChange = {};
    this.closePopUp();
  };

  render() {
    let self = this;
    return (
      <>
      <Modal show={this.showPopUp}
          onHide={() => {
            this.closePopUp();
          }}
      >
      <Modal.Header closeButton>
        <Modal.Title>Tool Options</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form className="ToolGrousForm" onSubmit={this.handleSubmit}>
          <div id="toolGroupsInfo">Choose in what groups your <b>{self.props.toolName}</b> shoud be in :</div>
          <div id="toolGroups"></div>
          <div className="FormBtns">
            <input className="FormCancelBtn" type="button" value="Cancel" onClick={this.closePopUp}/>
            <input className="FormSubmitBtn" type="submit" value="Save" />
          </div>
        </form>
      </Modal.Body>

      </Modal>
      </>
    );
  }
}

export default ToolOptions;

ToolOptions.propTypes = {
  showPopUp: PropTypes.bool.isRequired,
  toolId: PropTypes.number.isRequired,
  toolName: PropTypes.string.isRequired,
};
