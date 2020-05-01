import React, { Component } from "react";
import { Form, Col } from "react-bootstrap";
import "./CreateGroup.css";

class CreateGroup extends Component {
  state = {
    groupName: "",
    groupDescription: "",
    groupType: "",
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
      <div className="addToolForm">
        <h1 className="formTitle">Create a new group</h1>
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
          <br />
          <Form.Row>
            <input
              type="file"
              className="pictures"
              onChange={this.handleChange}
            />
          </Form.Row>
          <br />
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
    );
  }
}

export default CreateGroup;
