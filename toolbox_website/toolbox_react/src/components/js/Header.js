import React, { Component } from "react";
import "../css/Header.css";
import "../css/PopUp.css";
import icon from "../assets/toolBox_logo.png";
import { Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
//import { LinkContainer } from "react-router-bootstrap";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: false,
      signUp: false,
    };
  }

  render() {
    return (
      <>
        <Navbar expand="lg" fixed="top">
          <Navbar.Brand href="/">
            <img
              className="logoHead"
              width="45"
              height="45"
              src={icon}
              alt="webApp Logo"
              data-logo-alt={icon}
            />
            <h1 className="navTitle">ToolBox</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end" style={{ width: "100%" }}>
              <Nav.Item id="homeNav">
                <a className="Header_item" href="/">
                  Home
                </a>
              </Nav.Item>
              <Nav.Item id="helpNav">
                <a className="Header_item" href="/help">
                  Help
                </a>
              </Nav.Item>
              <Nav.Item id="myGroupsNav">
                <a className="Header_item" href="/myGroups">
                  My groups
                </a>
              </Nav.Item>
              <Nav.Item id="myToolsNav">
                <a className="Header_item" href="/myTools">
                  My tools
                </a>
              </Nav.Item>
              <Nav.Item id="myProfileNav">
                <a className="Header_item" href="/profile">
                  My profile
                </a>
              </Nav.Item>
              <Nav.Item id="signInNav">
                <SignIn />
              </Nav.Item>
              <Nav.Item id="signUpNav">
                <SignUp />
              </Nav.Item>
              <Nav.Item id="signOutNav">
                <SignOut />
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
export default Header;
