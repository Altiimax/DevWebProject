import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { apiRequest } from "../../api/apiRequest.js";
import { userFromToken } from "../../utils";
import addimg from "./addimg.png";

import "./AddTools.css";

const initialStates = {
  toolName: "",
  toolDescription: "",
  price: 0.00,
  typeOfRent: "",
  pictures: [],
};

let pictures_preview = [addimg,addimg,addimg,addimg,addimg];

/**
 *This component is used to register the information about a new tool added by
 * the user on the database. He must enter the tool name,
 * select a type of renting (by default it's per day), a currency and the price.
 * He can also add a description of the tool and pictures of it.
 * @param
 */
class AddTools extends Component {
  constructor(props) {
    super(props);
    this.state = initialStates;
    this.showPopUp = true;
  }

  componentDidUpdate() {
    this.showPopUp = this.props.showPopUp;
  }

  closePopUp = () => {
    this.showPopUp = false;
    this.setState(initialStates);
    pictures_preview = [addimg,addimg,addimg,addimg,addimg];
  };

  addToolApi = (user_id, data) => {
    let endpoint = "/api/persons/" + user_id + "/tools/";
    let req = new apiRequest();
    req.open("POST", `${endpoint}`);
    req.contentType("json");

    let self = this;
    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 201) {
          let toolId = JSON.parse(this.responseText).id_tool;
          let dataImages = new FormData();
          for( let img of self.state.pictures){
            dataImages.append("image", img, img.name);
            self.addToolImagesApi(toolId,dataImages);
          }
        }
      }
    });
    req.send(data);
  };

  addToolImagesApi = (tool_id, data) => {
    let endpoint = "/api/tools/" + tool_id + "/images/";
    let req = new apiRequest();
    req.open("POST", `${endpoint}`);
    req.contentType("formData");

    let self = this;

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 201) {
          self.props.refreshToolList();
        }
      }
    });
    req.send(data);
  };

  handleChange = (e) => {
    let target = e.target;
    let value = target.type === "file" ? target.files[0] : target.value;
    let name = target.name;
    if(target.type === "file"){
      let imgPos = parseInt(name.slice(-1))-1;
      pictures_preview[imgPos] = URL.createObjectURL(value);
      const prevPictures = this.state.pictures;
      prevPictures[imgPos] = value;
      this.setState({ pictures: prevPictures });
    }
    else{
      this.setState({
        [name]: value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let dataTool = {
      toolName: this.state.toolName,
      toolDescription: this.state.toolDescription,
      toolPrice: this.state.price,
    };
    if(this.state.pictures.length === 0){
      document.getElementById("imgError").style.display="block";
    }
    else{
      this.addToolApi(userFromToken().id, JSON.stringify(dataTool));
      this.closePopUp();
    }
  };

  render() {
    return (
      <>
      <Modal show={this.showPopUp}
          onHide={() => {
            this.closePopUp();
          }}
      >
      <Modal.Header closeButton>
        <Modal.Title>Add new tool</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form className="addToolForm" onSubmit={this.handleSubmit}>
          <label className="FormField_Label" htmlFor="toolName">
            Tool Name
          </label>
          <input
            required
            type="text"
            className="FormField_Input"
            name="toolName"
            placeholder="Enter the tool name"
            onChange={this.handleChange}
          />

          <label className="FormField_Label" htmlFor="toolDescription">
            Tool Description
          </label>
          <textarea
            type="text"
            className="FormField_TextArea"
            name="toolDescription"
            onChange={this.handleChange}
          />
          
          <div className="FormRow">
            <div>
              <label className="FormField_Label" htmlFor="price">
                Price
              </label>
              <div id="priceInput">
                <input
                  className="FormField_Input"
                  required
                  type="number"
                  min="0"
                  max="99999.99"
                  step="0.01"
                  name="price"
                  placeholder="0.00"
                  onChange={this.handleChange}
                />
                <div>€/day</div>
              </div>
            </div>

            {/*<div>  
              <label className="FormField_Label" htmlFor="typeOfRent">
                Type of renting
              </label>
              <select defaultValue="Per day" name="typeOfRent">
                <option value="Per hours">Per hours</option>
                <option value="Per day">Per day</option>
                <option value="Per week">Per week</option>
                <option value="Per month">Per month</option>
              </select>
            </div>*/}
          </div>
          
          <label className="FormField_Label">Tool Images</label>
          <div className="FormImgsDrop">
            <label htmlFor="picture_1">
              <img className="addImgBtn" src={pictures_preview[0]} alt="add_image"/>
              <input
                type="file"
                id="picture_1"
                name="picture_1"
                style={{visibility:"hidden"}}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="picture_2">
              <img className="addImgBtn" src={pictures_preview[1]} alt="add_image"/>
              <input
                type="file"
                id="picture_2"
                name="picture_2"
                style={{visibility:"hidden"}}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="picture_3">
              <img className="addImgBtn" src={pictures_preview[2]} alt="add_image"/>
              <input
                type="file"
                id="picture_3"
                name="picture_3"
                style={{visibility:"hidden"}}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="picture_4">
              <img className="addImgBtn" src={pictures_preview[3]} alt="add_image"/>
              <input
                type="file"
                id="picture_4"
                name="picture_4"
                style={{visibility:"hidden"}}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="picture_5">
              <img className="addImgBtn" src={pictures_preview[4]} alt="add_image"/>
              <input
                type="file"
                id="picture_5"
                name="picture_5"
                style={{visibility:"hidden"}}
                onChange={this.handleChange}
              />
            </label>            
          </div>

          <div id="imgError" className="error">You must upload at least one image!</div>

          <div className="FormBtns">
            <input className="FormCancelBtn" type="button" value="Cancel" onClick={this.closePopUp}/>
            <input className="FormSubmitBtn" type="submit" value="Add tool" />
          </div>
        </form>
      </Modal.Body>

      </Modal>
      </>
    );
  }
}

export default AddTools;

AddTools.propTypes = {
  showPopUp: PropTypes.bool.isRequired,
  refreshToolList: PropTypes.func.isRequired,
};