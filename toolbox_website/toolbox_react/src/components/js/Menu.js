import React, { Component } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      <div>
        <button className="menuButton">
          <Link to="/sign-in" className="FormField_Link">
            Sign-In
          </Link>
        </button>
        <div className="divider" />
        <button className="menuButton">
          <Link to="/sign-up" className="FormField_Link">
            Sign-Up
          </Link>
        </button>
        <div className="divider" />
        <button className="menuButton">
          <Link to="/help" className="FormField_Link">
            Help
          </Link>
        </button>
        <div className="divider" />
        <button className="menuButton">
          <Link to="/profile" className="FormField_Link">
            My profile
          </Link>
        </button>
      </div>
    );
  }
}

export default Menu;
