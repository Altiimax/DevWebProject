import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { apiRequest } from "../../api/apiRequest.js";

import "../css/Form.css";

const user_initialState = {
  id: "",
  email: "",
  password: "",
};

/**
 * Popup containing a form to sign-in
 */
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = user_initialState;
    this.showPopUp = true;
  }

  componentDidUpdate(){
    this.showPopUp = this.props.showPopUp;
  }

  closePopUp = () => {
    this.showPopUp = false;
    this.setState(user_initialState);
  }

  loginAPIRequest(email) {
    let self = this; //self will be a reference to the SignIn class object
    
    let endpoint = "/api/persons/login/?email=";

    let req = new apiRequest();
    req.open("GET", `${endpoint}${email}`);

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let usr = JSON.parse(this.responseText);
          let usr_id = usr[0].id_person;
          let usr_pwd = usr[0].password;
          if(usr_pwd === self.state.password){
            document.getElementById("signInError").innerHTML = "";
            self.props.handle_signIn(usr_id);
            self.closePopUp();
          }
          else{
            //wrong password
            document.getElementById("signInError").innerHTML = "Incorrect password";
          }
        }
        if (this.status === 404) {
          //no user with this email
          document.getElementById("signInError").innerHTML = "No user with this email address";
        }
      }
    });

    req.send();
  }



  handleChange = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.loginAPIRequest(this.state.email);
  };

  render() {
    return (
      <>
        {/* Sign-in popup */}
        <Modal show={this.showPopUp} onHide={ () => {this.closePopUp();}}>

          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form id="signInForm" onSubmit={this.handleSubmit}>

              <label className="FormField_Label" htmlFor="email"> E-mail address </label>
              <input
                required
                type="email"
                className="FormField_Input"
                name="email"
                placeholder="Enter your e-mail address"
                value={this.state.email}
                onChange={this.handleChange}
              />
              
              <label className="FormField_Label" htmlFor="password"> Password </label>
              <input
                required
                type="password"
                className="FormField_Input"
                name="password"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={this.handleChange}
              />

              <div className="error" id="signInError" disabled="disabled"></div>

              <div className="FormBtns">
                <input className="FormCancelBtn" type="button" value="Cancel" onClick={this.closePopUp} />
                <input className="FormSubmitBtn" type="submit" value="Sign-in" />
              </div>
              
            </form>
          </Modal.Body>

        </Modal>
      </>
    );
  }
}

export default SignIn;


SignIn.propTypes = {
  showPopUp: PropTypes.bool.isRequired,
  handle_signIn: PropTypes.func.isRequired
};

