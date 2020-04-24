import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { apiRequest } from "../../api/apiRequest.js";

import "../css/Form.css";


const user_initialState = {
  email: "",
  firstname: "",
  lastname: "",
  birthDate: "",
  alias: "",
  newPassword: "",
  confirmPassword: "",
  hasagreed: false,
};

/**
 * Popup containing a form to sign-up
 */
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = user_initialState;
    this.showPopUp = true;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(){
    this.showPopUp = this.props.showPopUp;
  }

  closePopUp = () => {
    this.showPopUp = false;
    this.setState(user_initialState);
  }

  newAccountAPIRequest(newprofile) {
    let self = this; //self will be a reference to the SignUp class object

    let endpoint = "/api/persons/";

    let req = new apiRequest();
    req.open("POST", `${endpoint}`);
    req.contentType("json");

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 201) {
          let usr = JSON.parse(this.responseText);
          let usr_id = usr.id_person;
          self.props.handle_signUp(usr_id);
          self.closePopUp();
        }
        else if (this.status === 409) {
          let error = JSON.parse(this.responseText).error;
          if (error.includes("alias")){
            document.getElementById("alias_error").innerHTML = error;
          }
          else if (error.includes("email")){
            document.getElementById("email_error").innerHTML = error;
          }
          else{
            console.log(error);
          }
        }
      }
    });

    req.send(newprofile);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState(
      {
        [name]: value,
      },
      function () {
        if (name === "birthDate") {
          //Check if the age is correct
          let now = new Date();
          let input = new Date(value);
          let age = Math.floor((now - input) / 31557600000);
          if (age < 18) {
            let errorMessage =
              "<p>You must be 18 to register to this application! But your age is : " +
              age +
              " </p>";
            document.getElementById("date_error").innerHTML = errorMessage;
          } else {
            document.getElementById("date_error").innerHTML = "";
          }
        }

        if (name === "newPassword") {
          //Check if password has a minimum length of 8
          if (value !== "" && value.length < 8) {
            let errorMessage =
              "<p>The password must be 8 characters minimum!</p>";
            document.getElementById(
              "newpassword_error"
            ).innerHTML = errorMessage;
          } else {
            document.getElementById("newpassword_error").innerHTML = "";
          }
        }

        if (name === "confirmPassword") {
          //Check if passwords are matching
          if (
            value !== "" &&
            this.state.newPassword !== this.state.confirmPassword
          ) {
            let errorMessage = "<p>Your passwords doesn't match!</p>";
            document.getElementById("password_error").innerHTML = errorMessage;
          } else {
            document.getElementById("password_error").innerHTML = "";
          }
        }
      }
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      lastName: this.state.lastname,
      firstName: this.state.firstname,
      birthDate: this.state.birthDate,
      alias: this.state.alias,
      email: this.state.email,
      password: this.state.newPassword,
    };

    this.newAccountAPIRequest(JSON.stringify(data));
  }

  render() {
    return (
      <>
        {/* Sign-up popup */}
        <Modal show={this.showPopUp} onHide={() => {this.closePopUp();}}>

          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form id="signUpForm" onSubmit={this.handleSubmit}>

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
              <span className="error" id="email_error"></span>

              <label className="FormField_Label" htmlFor="firstname"> First name </label>
              <input
                required
                type="text"
                className="FormField_Input"
                name="firstname"
                placeholder="Enter your forename"
                value={this.state.firstname}
                onChange={this.handleChange}
              />

              <label className="FormField_Label" htmlFor="lastname"> Last name </label>
              <input
                required
                type="text"
                className="FormField_Input"
                name="lastname"
                placeholder="Enter your surename"
                value={this.state.lastname}
                onChange={this.handleChange}
              />

              <label className="FormField_Label" htmlFor="birthDate"> Birthdate </label>
              <input
                required
                type="date"
                className="FormField_Input"
                name="birthDate"
                value={this.state.birthDate}
                onChange={this.handleChange}
              />
              <span className="error" id="date_error"></span>
              
              <label className="FormField_Label" htmlFor="alias"> Alias </label>
              <input
                required
                type="text"
                className="FormField_Input"
                name="alias"
                placeholder="Enter your alias"
                value={this.state.alias}
                onChange={this.handleChange}
              />
              <span className="error" id="alias_error"></span>

              <label className="FormField_Label" htmlFor="newPassword"> New password </label>
              <input
                required
                type="password"
                className="FormField_Input"
                name="newPassword"
                placeholder="Enter a new password"
                value={this.state.newPassword}
                onChange={this.handleChange}
              />
              <span className="error" id="newpassword_error"></span>

              <label className="FormField_Label" htmlFor="confirmPassword"> Password confirmation </label>
              <input
                required
                type="password"
                className="FormField_Input"
                name="confirmPassword"
                placeholder="Enter your password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
              <span className="error" id="password_error"></span>

              <br />

              <label className="FormField_CheckBox" htmlFor="hasagreed"></label>
              <input
                required
                type="checkbox"
                className="FormField_Input_Check"
                name="hasagreed"
                value={this.state.hasagreed}
                onChange={this.handleChange}
              />
              {" "} I agree with all the statements in {" "}
              <a href="/terms" className="FormField_TermsLink"> terms of service. </a>
              
              <div className="FormBtns">
                <input className="FormCancelBtn" type="button" value="Cancel" onClick={this.closePopUp}/>
                <input className="FormSubmitBtn" type="submit" value="Sign-up"/>
              </div>

            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default SignUp;


SignUp.propTypes = {
  showPopUp: PropTypes.bool.isRequired,
  handle_signUp: PropTypes.func.isRequired
};