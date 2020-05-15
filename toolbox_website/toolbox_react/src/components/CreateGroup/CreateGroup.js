import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Col } from "react-bootstrap";
import "./CreateGroup.css";

const initialStates = {
  groupName: "",
  groupDescription: "",
  groupType: "",
};

class CreateGroup extends Component {
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

  handleChange = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    console.log(this.state);
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
        <Modal.Title>Create new group</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="addToolForm">
          <Form className="baseForm" onSubmit={this.handleSubmit}>
            <Form.Row>
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
            </Form.Row>
            <Form.Row>
              <Col>
                <label className="FormField_Label" htmlFor="groupType">
                  Group Type
                </label>
                <select defaultValue="private" name="groupType">
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
              </Col>
            </Form.Row>
            <div className="FormBtns">
              <input className="FormCancelBtn" type="button" value="Cancel" />
              <input
                className="FormSubmitBtn"
                type="submit"
                value="Add tool"
                onClick={this.handleSubmit}
              />
            </div>
          </Form>
        </div>
      </Modal.Body>

      </Modal>
      </>
    );
  }
}

export default CreateGroup;

CreateGroup.propTypes = {
  showPopUp: PropTypes.bool.isRequired,
};