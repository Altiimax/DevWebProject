import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../css/Help.css";

class Help extends Component {
  render() {
    return (
      <div className="helpPage">
        <h1 className="Text">
          This part of the application is in construction
        </h1>
        <div className="divider" />
        <button className="goBackMenuButton">
          <Link to="/" className="FormField_Link">
            Go back to the Menu
          </Link>
        </button>
      </div>
    );
  }
}

export default Help;
