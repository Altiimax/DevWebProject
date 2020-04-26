import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Form, Col } from "react-bootstrap";
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
  state = {
    initialStates,
  };

  handleChange = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="addToolForm">
        <h1 className="formTitle">Add new tool</h1>
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
          <label className="FormField_Label" htmlFor="toolState">
            State of wear
          </label>
          <select name="toolState">
            <option>New</option>
            <option>Bit used</option>
            <option selected>Used</option>
            <option>Pretty used</option>
            <option>In bad conditions</option>
          </select>
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
              <label className="FormField_Label" htmlFor="currency">
                Currency
              </label>
              <input
                type="text"
                name="currency"
                required
                onChange={this.handleChange}
              />
              {/*A modifier*/}
            </Col>
            <Col>
              <label className="FormField_Label" htmlFor="typeOfRent">
                Type of renting
              </label>
              <select name="typeOfRent">
                <option>Free</option>
                <option>Per hours</option>
                <option selected>Per day</option>
                <option>Per week</option>
                <option>Per month</option>
              </select>
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <label htmlFor="pictures">Select a file: </label>
            <input
              type="file"
              id="pictures"
              name="pictures"
              onChange={this.handleChange}
            />
          </Form.Row>
          <br />
          <div className="FormBtns">
            <input className="FormCancelBtn" type="button" value="Cancel" />
            <input className="FormSubmitBtn" type="submit" value="Add tool" />
          </div>
        </Form>
      </div>
    );
  }
}

/*
   <Modal>
          <Modal.Header closeButton>
            <Modal.Title>Add new tool</Modal.Title>
          </Modal.Header>

          <Modal.Body>
             </Modal.Body>
        </Modal>
*/

export default AddTools;
