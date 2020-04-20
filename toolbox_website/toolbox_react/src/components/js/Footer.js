import React, { Component } from "react";
import "../css/Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="MainFooter">
        <ul>
          <li>
            <a href="/about-us">About Us</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} ToolBox | All right reserved |
            {<a href="/terms"> Terms of Service </a>} | Privacy
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
