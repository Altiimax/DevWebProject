import React, { Component } from "react";
import PropTypes from "prop-types";
import { apiRequest } from "../../api/apiRequest.js";
import { userFromToken } from "../../utils";
import { Modal } from "react-bootstrap";
import "./CreateGroup.css";

const initialStates = {
  groupName: "",
  groupDescription: "",
  groupType: "private",
  groupCountry: "",
  groupTown: "",
  groupRange: 50,
};

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = initialStates;
    this.showPopUp = true;
  }

  componentDidMount() {
    this.getAllCountriesApiRequest();
  }

  componentDidUpdate() {
    this.showPopUp = this.props.showPopUp;
  }

  closePopUp = () => {
    this.showPopUp = false;
    this.setState(initialStates);
  };


  getAllCountriesApiRequest(){
    let endpoint ="/api/countries/";
    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    let self = this;

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let countryOptions = JSON.parse(this.responseText);
          let countrySelectHtml = "";
          for (let c of countryOptions){
            countrySelectHtml += `<option value=${c.id_countryCode}>${c.countryName}</option>`
          }
          document.getElementById("groupCountrySelect").innerHTML = countrySelectHtml;
          self.getAllTownsApiRequest(countryOptions[0].id_countryCode);
        }
        if (this.status === 404) {
          //TODO
        }
      }
    });
  
    req.send();
  }

  getAllTownsApiRequest(countryId){
    let endpoint =`/api/towns/?countryCode=${countryId}`;
    let req = new apiRequest();
    req.open("GET", `${endpoint}`);
  
    let self = this;

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let townOptions = JSON.parse(this.responseText);
          let townSelectHtml = "";
          for (let t of townOptions){
            townSelectHtml += `<option value=${t.id_town}>${t.townName}</option>`
          }
          document.getElementById("groupTownSelect").innerHTML = townSelectHtml;
          self.setState({groupTown:townOptions[0].id_town});
        }
        if (this.status === 404) {
          //TODO
        }
      }
    });
  
    req.send();
  }

  postGroupApiRequest(data){
      let endpoint = "/api/groups/";
      let req = new apiRequest();
      req.open("POST", `${endpoint}`);
      req.contentType("json");
  
      let self = this;

      req.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          if (this.status === 201) {
            let memberData = {
              id_person: userFromToken().id,
              id_groupName: JSON.parse(this.responseText).id_groupName,
              groupAdmin: true,
            }
            self.postGroupMemberApiRequest(JSON.stringify(memberData));
          }
          else if (this.status === 400){
            document.getElementById("GrounNameError").style.display="block";
          }
        }
      });
      req.send(data);
  };

  postGroupMemberApiRequest(data){
    let endpoint = "/api/groups/members/";
    let req = new apiRequest();
    req.open("POST", `${endpoint}`);
    req.contentType("json");

    let self = this;

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 201) {
          self.props.refreshGroupList();
          self.closePopUp();
        }
      }
    });
    req.send(data);
  }

  
  handleChange = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    if(name === "groupCountry"){
      this.getAllTownsApiRequest(value);
    }
    else{
      this.setState({
        [name]: value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      id_groupName: this.state.groupName,
      groupType: this.state.groupType,
      groupDescription: this.state.groupDescription,
      groupRange: this.state.groupRange,
      id_town: this.state.groupTown,
    };
    this.postGroupApiRequest(JSON.stringify(data));
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
        <Modal.Title>Create new group</Modal.Title>
      </Modal.Header>

      <Modal.Body>
          <form className="addToolForm" onSubmit={this.handleSubmit}>
            <label className="FormField_Label" htmlFor="groupName">
              Name of your group
            </label>
            <input
              required
              type="text"
              className="FormField_Input"
              name="groupName"
              placeholder="Enter the name of your group"
              onChange={this.handleChange}
            />

            <label className="FormField_Label" htmlFor="groupDescription">
              Group Description
            </label>
            <textarea
              type="text"
              className="FormField_TextArea"
              name="groupDescription"
              onChange={this.handleChange}
            />
        
            <label className="FormField_Label" htmlFor="groupType">
              Group Type
            </label>
            <select defaultValue={self.state.groupType} name="groupType" onChange={this.handleChange}>
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>

            <div id="CreateGrouplocation">
              <div>
                <label className="FormField_Label" htmlFor="groupCountry">
                  Country
                </label>
                <select id="groupCountrySelect" name="groupCountry" onChange={this.handleChange}>
                </select>
              </div>

              <div>
                <label className="FormField_Label" htmlFor="groupTown">
                  Town
                </label>
                <select id="groupTownSelect" name="groupTown" onChange={this.handleChange}>
                </select>
              </div>
            </div>
        
            <div id="GrounNameError" className="error">The group-name you chose is already taken!</div>

            <div className="FormBtns">
              <input className="FormCancelBtn" type="button" value="Cancel" onClick={this.closePopUp}/>
              <input className="FormSubmitBtn" type="submit" value="Create group"/>
            </div>
          </form>
      </Modal.Body>

      </Modal>
      </>
    );
  }
}

export default CreateGroup;

CreateGroup.propTypes = {
  showPopUp: PropTypes.bool.isRequired,
  refreshGroupList: PropTypes.func.isRequired,
};