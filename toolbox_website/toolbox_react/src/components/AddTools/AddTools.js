import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Col } from "react-bootstrap";
import { apiRequest } from "../../api/apiRequest.js";
import { userFromToken } from "../../utils";
import addimg from "./add.png";

import "./AddTools.css";

const initialStates = {
  toolName: "",
  toolDescription: "",
  toolState: "",
  price: "",
  currency: "€",
  typeOfRent: "",
  pictures: "",
};

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
  };

  addToolApi = (user_id, data) => {
    let endpoint = "/api/persons/" + user_id + "/tools/";
    let req = new apiRequest();
    req.open("POST", `${endpoint}`);
    req.contentType("json");

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 201) {
          console.log(this.responseText);
        }
      }
    });

    req.send(data);
    console.log("envoyer");
  };

  handleChange = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      toolName: this.state.toolName,
      toolDescription: this.state.toolDescription,
      toolPrice: this.state.price,
    };
    this.addToolApi(userFromToken().id, JSON.stringify(data));
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
      <div className="addToolForm">
        <Form className="baseForm" onSubmit={this.handleSubmit}>
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
          <Form.Row>
            <Col>
              <label className="FormField_Label" htmlFor="price">
                Price
              </label>
              <input
                required
                type="number"
                min="0"
                max="99999.99"
                step="0.01"
                name="price"
                onChange={this.handleChange}
              />
            </Col>
            <Col>
              <label className="FormField_Label" htmlFor="typeOfRent">
                Type of renting
              </label>
              <select defaultValue="Per day" name="typeOfRent">
                <option value="Free">Free</option>
                <option value="Per hours">Per hours</option>
                <option value="Per day">Per day</option>
                <option value="Per week">Per week</option>
                <option value="Per month">Per month</option>
              </select>
            </Col>
          </Form.Row>
          <Form.Row>
            <label htmlFor="pictures"><img src={addimg} alt="add_image"/></label>
            <input
              type="file"
              id="pictures"
              name="pictures"
              style={{visibility:"hidden"}}
              onChange={this.handleChange}
            />
          </Form.Row>
          <div className="FormBtns">
            <input className="FormCancelBtn" type="button" value="Cancel" />
            <input className="FormSubmitBtn" type="submit" value="Add tool" />
          </div>
        </Form>
      </div>
      </Modal.Body>

      </Modal>
      </>
    );
  }
}

export default AddTools;

AddTools.propTypes = {
  showPopUp: PropTypes.bool.isRequired,
};