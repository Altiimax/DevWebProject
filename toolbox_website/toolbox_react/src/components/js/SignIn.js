import React, { Component } from "react";
import "../css/Form.css";
import { apiRequest } from "../../api/apiRequest.js";

/*-----Here are the URL links to the back-end-----*/
let uri = "http://127.0.0.1";
let port = 8000;
let endpoint = "/api/persons/login/?email=";

function loginRequest(email) {
  let req = new apiRequest();
  req.open("GET", `${uri}:${port}${endpoint}${email}`);
  req.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        console.log("resp status :" + this.status);
        console.log("resp text :" + this.responseText);
        let obj = JSON.parse(this.responseText);
        let idLogged = obj[0].id_person;
        console.log(idLogged); // id de la personne (pourquoi tableau alors qu'une seul personne?)
        document.getElementById("errorSend").innerHTML = "";
      }
      if (this.status === 404) {
        let obj = JSON.parse(this.responseText);
        document.getElementById("errorSend").innerHTML = obj.error;
      }
    }
  });
  req.send();
}

const initialState = {
  alias: "",
  email: "",
  password: "",
  aliasError: "",
  emailError: "",
  passwordError: "",
};

/**
 * This component is the formular the user must fill to connect
 * to his account.
 * @param
 * @return 'XML form'
 */
class SignIn extends Component {
  constructor() {
    super();

    this.state = initialState;
  }

  validate() {
    let aliasError = "";
    let emailError = "";
    let passwordError = "";

    if (!this.state.alias) {
      aliasError = "Alias field should not be empty!";
    }

    if (!this.state.email.includes("@")) {
      emailError = "Invalid email, should contain an @ sign!";
    }

    if (this.state.password.length < 8) {
      passwordError =
        "Your password is too short, it must be 8 characters length!";
    }

    if (emailError || aliasError || passwordError) {
      this.setState({ emailError, aliasError, passwordError });
      return false;
    }
    return true;
  }

  handleChange = (e) => {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log("The form was submitted with the following data:");
      console.log(this.state);
      this.setState(initialState);
      loginRequest(this.state.email);
    }
  };

  render() {
    return (
      <>
        <form id="signInForm" onSubmit={this.handleSubmit}>
          <label className="FormField_Label" htmlFor="alias">
            Alias :
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
          <div className="error">{this.state.aliasError}</div>

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
          <div className="error">{this.state.emailError}</div>

          <label className="FormField_Label" htmlFor="password">
            Password
          </label>
          <input
            required
            type="password"
            className="FormField_Input"
            name="password"
            placeholder="Enter your password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div className="error">{this.state.passwordError}</div>
          <input type="submit" value="Sign-in" />
        </form>
        <div className="error" id="errorSend"></div>
      </>
    );
  }
}

export default SignIn;
