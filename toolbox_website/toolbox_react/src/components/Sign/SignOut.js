import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

import "./Form.css";

class SignOut extends Component {
  constructor(props) {
    super(props);
    this.showPopUp = true;
  }

  componentDidUpdate() {
    this.showPopUp = this.props.showPopUp;
  }

  closePopUp = () => {
    this.showPopUp = false;
    this.forceUpdate();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handle_signOut();
    this.closePopUp();
  };

  render() {
    return (
      <>
        {/* Sign-out popup */}
        <Modal
          show={this.showPopUp}
          onHide={() => {
            this.closePopUp();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sign Out</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form id="signOutForm" onSubmit={this.handleSubmit}>
              <label className="FormField_Label">
                {" "}
                Are you sure you want to sign out ?
              </label>

              <div className="FormBtns">
                <input
                  className="FormCancelBtn"
                  type="button"
                  value="Cancel"
                  onClick={this.closePopUp}
                />
                <input
                  className="FormSubmitBtn"
                  type="submit"
                  value="Sign-out"
                />
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default SignOut;

SignOut.propTypes = {
  showPopUp: PropTypes.bool.isRequired,
  handle_signOut: PropTypes.func.isRequired,
};
