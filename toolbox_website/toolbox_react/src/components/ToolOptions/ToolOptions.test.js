import React from "react";
import ReactDOM from "react-dom";
import ToolOptions from "./ToolOptions.js";

test("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ToolOptions />, div);
});
