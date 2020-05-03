import React, { Component } from "react";
import FormTool from "./FormTool/FormTool.js";
import { Form, Col } from "react-bootstrap";

class test extends Component {
  render() {
    return (
      <div>
        <Form>
          <Form.Row>
            <Col>
              <FormTool
                isRequired="true"
                classLabel="FormField_Label"
                classInput="FormField_Input"
                label="Bonjour"
                type="textarea"
                for="test"
                placeholder="Coucou"
              />
            </Col>
            <Col>
              <FormTool
                classLabel="FormField_Label"
                classInput="FormField_Input"
                label="Bonjour"
                type="textarea"
                for="test"
                placeholder="Coucou"
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <FormTool
              classLabel="FormField_Label"
              classInput="FormField_Input"
              label="Bonjour"
              type="file"
              for="test"
              placeholder="Coucou"
            />
          </Form.Row>
        </Form>
      </div>
    );
  }
}

export default test;
