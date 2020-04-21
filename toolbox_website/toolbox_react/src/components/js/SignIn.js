import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "../css/Form.css";
import "../css/Header.css";
import { apiRequest } from "../../api/apiRequest.js";

/*-----Here are the URL links to the back-end-----*/
let uri = "http://127.0.0.1";
let port = 8000;
let endpoint = "/api/persons/login/?email=";

const initialState = {
  id: "",
  email: "",
  password: "",
};

/**
 * This component is the formular the user must fill to connect
 * to his account.
 * @param
 * @return 'XML form'
 */
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      initialState,
    }
  }

  loginRequest(email) {
    let self = this; //self will be a reference to the SignIn class object
    this.pwd = this.state.password;
    let req = new apiRequest();
    req.open("GET", `${uri}:${port}${endpoint}${email}`);
    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let usr = JSON.parse(this.responseText);
          let usr_id = usr[0].id_person;
          let usr_pwd = usr[0].pwd_test;
          if(usr_pwd == self.state.password){
            document.getElementById("signInError").innerHTML = "";
            self.closePopUp(); //Closing the sign-in popup
            //TODO redirection vers la page "Profile" : 
            window.location.replace("http://localhost:3000/Profile/"); //TODO PAS BIEN! A MODIFIER!
          }
          else{
            //wrong password
            document.getElementById("signInError").innerHTML = "Incorrect password";
          }
        }
        if (this.status === 404) {
          //no user with this email
          let usr = JSON.parse(this.responseText);
          document.getElementById("signInError").innerHTML = "No user with this email address";
        }
      }
    });
    req.send();
  }


  showPopUp(s) {
    if (s){
      this.setState({ showPopup: true });
    }
    else{
      this.setState({ showPopup: false });
    }
  }

  closePopUp = () => {
    this.showPopUp(false);
  }

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
    this.loginRequest(this.state.email);
  };

  render() {
    return (
      <>
      <a className="Header_item" href="#" onClick={() => {this.showPopUp(true);}} variant="primary">Sign-in</a>
      <div>
          {/* Sign-in popup */}
          <Modal
            show={this.state.showPopup}
            onHide={() => {
              this.showPopUp(false);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form id="signInForm" onSubmit={this.handleSubmit}>
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
                <div className="error" id="signInError" disabled="disabled"></div>
                <div className="FormBtns">
                  <input className="FormCancelBtn" type="button" value="Cancel" onClick={this.closePopUp} />
                  <input className="FormSubmitBtn" type="submit" value="Sign-in" />
                </div>
              </form>
            </Modal.Body>

          </Modal>
      </div>
      </>
    );
  }
}

export default SignIn;

