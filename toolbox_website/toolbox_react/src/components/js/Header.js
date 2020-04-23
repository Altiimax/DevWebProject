import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import icon from "../assets/toolBox_logo.png";

import "../css/Header.css";
import "../css/PopUp.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Header(props) {
  
  const signed_out_header = (
    <Navbar expand="lg" fixed="top">
      <Navbar.Brand>
        <NavLink to="/">
          <img
            className="logoHead"
            src={icon}
            alt="webApp Logo"
            data-logo-alt={icon}
          />
          <h1 className="navTitle">ToolBox</h1>
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-end" style={{ width: "100%" }}>
          <Nav.Item id="homeNav"> <NavLink className="Header_item" activeClassName="Header_item-active" exact to="/">Home</NavLink> </Nav.Item>
          <Nav.Item id="helpNav"> <NavLink className="Header_item" activeClassName="Header_item-active" exact to="/help">Help</NavLink> </Nav.Item>
          <Nav.Item id="signInNav"> <span className="Header_item" onClick={() => props.display_popUp('sign-in')} >Sign In</span> </Nav.Item>
          <Nav.Item id="signUpNav"> <span className="Header_item" onClick={() => props.display_popUp('sign-up')} >Sign Up</span> </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

  const signed_in_header = (
    <Navbar expand="lg" fixed="top">
      <Navbar.Brand>
        <NavLink to="/">
          <img
            className="logoHead"
            src={icon}
            alt="webApp Logo"
            data-logo-alt={icon}
          />
          <h1 className="navTitle">ToolBox</h1>
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-end" style={{ width: "100%" }}>
          <Nav.Item id="homeNav"> <NavLink className="Header_item" activeClassName="Header_item-active" exact to="/">Home</NavLink> </Nav.Item>
          <Nav.Item id="helpNav"> <NavLink className="Header_item" activeClassName="Header_item-active" exact to="/help">Help</NavLink> </Nav.Item>
          <Nav.Item id="signOutNav"> <span className="Header_item" onClick={() => props.display_popUp('sign-out')} >Sign Out</span> </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

  return (
    <div>{props.signed_in ? signed_in_header : signed_out_header}</div>
  )
  
}

export default Header;

Header.propTypes = {
  signed_in: PropTypes.bool.isRequired,
  display_popUp: PropTypes.func.isRequired
};