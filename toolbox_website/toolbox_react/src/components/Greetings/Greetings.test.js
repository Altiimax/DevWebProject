import React from "react";
import ReactDOM from "react-dom";
import Greetings from "./Greetings.js";
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Greetings />, div);
});
