import React, { Component } from "react";
import "./Rating.css";

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRating: this.props.currentRating,
    };
  }

  render() {
    return <div></div>;
  }
}

export default Rating;
