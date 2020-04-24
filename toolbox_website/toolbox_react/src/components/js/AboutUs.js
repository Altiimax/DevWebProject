import React, { Component } from "react";

import "../css/AboutUs.css";

class AboutUs extends Component {
  render() {
    return (
      <div className="AboutUs">
        <h1>
          We're student from EPHEC. <br />
          And this is our project
        </h1>
        <div className="Photos">Here will be displayed the photos of us 3.</div>
      </div>
    );
  }
}

export default AboutUs;
