import React from "react";
import "./Greetings.css";
/**
 * This component is used to render a personalised greeting message.
 * It rendre the greetings message in a h1 element.
 * @param {*} props
 */

const Greet = (props) => {
  return (
    <div>
      <h1 className="Text">Welcome to your profile page {props.name}!</h1>
    </div>
  );
};
export default Greet;
