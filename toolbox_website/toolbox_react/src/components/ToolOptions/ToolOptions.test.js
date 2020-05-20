import React from "react";
import ReactDOM from "react-dom";
import ToolOptions from "./ToolOptions.js";
import TestRenderer from "react-test-renderer";

test("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ToolOptions />, div);
});
