import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "../css/Form.css";
import "../css/Header.css";
import { apiRequest } from "../../api/apiRequest.js";
//import GreenCheck from './assets/Green-Check.png'

/*-----Here are the URL links to the back-end-----*/
let uri = "http://127.0.0.1";
let port = 8000;
let endpoint = "/api/persons/";

/**
 * This component is used to register the information set by
 * the user to the database. He must enter his forename, surname,
 * email address, alias, password, ...
 * @param
 */
class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      showPopup: false,
      email: "",
      firstname: "",
      lastname: "",
      birthDate: "",
      alias: "",
      newPassword: "",
      confirmPassword: "",
      hasagreed: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  accountRequest(newprofile) {
    let self = this;
    let req = new apiRequest();
    req.open("POST", `${uri}:${port}${endpoint}`);
    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log("resp status :" + this.status);
        console.log("resp text :" + this.responseText);
        //let obj = JSON.parse(this.responseText);
        //console.log(obj);
        if (this.status === 201) {
          self.closePopUp(); //on ferme le popup
          //TODO redirection vers la page "Profile"
        }
      }
    });
    req.send(newprofile);
  }

  showPopUp(s) {
    if (s) {
      this.setState({ showPopup: true });
    } else {
      this.setState({ showPopup: false });
    }
  }

  closePopUp = () => {
    this.showPopUp(false);
  };

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
          //Verify if the age is correct
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
            //document.getElementById('greencheck').innerHTML = '<img className="img-greenCheck" src='+{GreenCheck}+' alt="This field as passed the test"/>'
          }
        }

        if (name === "newPassword") {
          //Verify if password has a minimum length of 8
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
          //Verify if passwords are matching
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
    let request = {
      lastName: this.state.lastname,
      firstName: this.state.firstname,
      birthDate: this.state.birthDate,
      alias: this.state.alias,
      email: this.state.email,
      pwd_test: this.state.newPassword,
    };

    this.accountRequest(JSON.stringify(request));
  }

  render() {
    return (
      <>
        <a
          className="Header_item"
          href="#"
          onClick={() => {
            this.showPopUp(true);
          }}
          variant="primary"
        >
          Sign-up
        </a>
        <div>
          {/* Sign-up popup */}
          <Modal
            show={this.state.showPopup}
            onHide={() => {
              this.showPopUp(false);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form id="signUpForm" onSubmit={this.handleSubmit}>
                <label className="FormField_Label" htmlFor="email">
                  E-mail address
                </label>
                <input
                  required
                  type="email"
                  className="FormField_Input"
                  name="email"
                  placeholder="Enter your e-mail address"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <label className="FormField_Label" htmlFor="firstname">
                  First name
                </label>
                <input
                  required
                  type="text"
                  className="FormField_Input"
                  name="firstname"
                  placeholder="Enter your forename"
                  value={this.state.firstname}
                  onChange={this.handleChange}
                />
                <label className="FormField_Label" htmlFor="lastname">
                  Last name
                </label>
                <input
                  required
                  type="text"
                  className="FormField_Input"
                  name="lastname"
                  placeholder="Enter your surename"
                  value={this.state.lastname}
                  onChange={this.handleChange}
                />
                <label className="FormField_Label" htmlFor="birthDate">
                  Birthdate
                </label>
                <span className="check-img" id="greencheck"></span>
                <input
                  required
                  type="date"
                  className="FormField_Input"
                  name="birthDate"
                  value={this.state.birthDate}
                  onChange={this.handleChange}
                />
                <span className="error" id="date_error"></span>
                <label className="FormField_Label" htmlFor="alias">
                  Alias
                </label>
                <input
                  required
                  type="text"
                  className="FormField_Input"
                  name="alias"
                  placeholder="Enter your alias"
                  value={this.state.alias}
                  onChange={this.handleChange}
                />
                <label className="FormField_Label" htmlFor="newPassword">
                  New password
                </label>
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
                <label className="FormField_Label" htmlFor="confirmPassword">
                  Password confirmation
                </label>
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
                <label
                  className="FormField_CheckBox"
                  htmlFor="hasagreed"
                ></label>
                <input
                  required
                  type="checkbox"
                  className="FormField_Input_Check"
                  name="hasagreed"
                  value={this.state.hasagreed}
                  onChange={this.handleChange}
                />{" "}
                I agree with all the statements in{" "}
                <a href="/terms" className="FormField_TermsLink">
                  terms of service.
                </a>
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
                    value="Sign-up"
                  />
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}

export default SignUp;
