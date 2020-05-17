import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { apiRequest } from "../../api/apiRequest.js";

import "./ToolDetail.css";

let isInDev = require('../../prod.json').inDev;
let url = "http://localhost:8000";
if(!isInDev){
  url = "";
}

const initialStates = {
  toolObj: {
    toolOwner: {
      id_person: 0,
      alias: "",
      email: ""
    },
    id_tool: 0,
    toolName: "",
    toolDescription: "",
    toolPrice: 0,
    toolImages: [
      {
        id_toolImage: 0,
        id_tool: 0,
        image: ""
      }
    ],
    reviews: []
  },
};

let toolImageList = [];

class ToolDetail extends Component {
  constructor(props) {
    super(props);
    this.state = initialStates;
    this.showPopUp = true;
    this.compUpdated = 0;
  }

  componentDidMount(){
    this.getToolApiRequest(this.props.toolId);
  }

  componentDidUpdate() {
    this.showPopUp = this.props.showPopUp;
    if(this.compUpdated === 1){
      this.getToolApiRequest(this.props.toolId);
    }
    this.compUpdated++;
  }

  closePopUp = () => {
    this.showPopUp = false;
    this.setState(initialStates);
    this.compUpdated = 0;
  };


  getToolApiRequest(id){
    let endpoint = "/api/tools/" + id + "/";
    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    let self = this;

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let resp = JSON.parse(this.responseText)[0];
          self.setState({toolObj:resp});
          toolImageList = [];
          let key_ti = 0;
          for (let ti of self.state.toolObj.toolImages){
            toolImageList.push(<img id="ToolDetailImg" key={key_ti} src={url + ti.image} alt={ti.id_toolImage} ></img>);
            key_ti ++;
          }
          ReactDOM.render(toolImageList, document.getElementById("ToolDetailImages"));
        }
      }
    });

    req.send();
  }

  openEmailClient(self){
    let Dst = self.state.toolObj.toolOwner.email;
    let Sub = `Toolbox-App - ${self.state.toolObj.toolName}`;
    let Cont = `
    Dear ${self.state.toolObj.toolOwner.alias},
    %0D%0A
    %0D%0A
    I saw you rent a ${self.state.toolObj.toolName} on the Toolbox-app's website and would like to know if it is still available from .... to .... ?
    %0D%0A
    %0D%0A
    Thank you in advance,
    %0D%0A
    %0D%0A
    Yours sincerely, 
    %0D%0A
    %0D%0A
    ....
    `;

    window.location.href = `mailto:${Dst}?subject=${Sub}&body=${Cont}`;
    self.closePopUp();
  }

  render() {
    let tool = this.state.toolObj;
    return (
      <>
      <Modal id="ToolDetailModal" show={this.showPopUp}
          onHide={() => {
            this.closePopUp();
          }}
      >
      <Modal.Header closeButton>
        <Modal.Title>Tool Detail</Modal.Title>
      </Modal.Header>

      <Modal.Body>
          <div id="ToolDetailContent">
            <div id="ToolDetailName"><h2>{tool.toolName}</h2></div>
            <div id="ToolDetailInfo">
              <div>Owner: {tool.toolOwner.alias}</div>
              <button id="ToolDetailBtn" onClick={()=>this.openEmailClient(this)}>Contact Owner</button>
              <div>Price: {tool.toolPrice} €</div>
            </div>
            <div id="ToolDetailDescription">
              <div>{tool.toolDescription}</div>
            </div>
            <div id="ToolDetailImages"></div>
          </div>
      </Modal.Body>

      </Modal>
      </>
    );
  }
}

export default ToolDetail;

ToolDetail.propTypes = {
  showPopUp: PropTypes.bool.isRequired,
  toolId: PropTypes.number.isRequired,
};
