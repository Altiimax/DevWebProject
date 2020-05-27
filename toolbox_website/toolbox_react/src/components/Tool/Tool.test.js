import React from "react";
import ReactDOM from "react-dom";
import Tool from "./Tool.js";
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Tool />, div);
});
