import React from "react";
import ReactDOM from "react-dom";
import ToolGroups from "./ToolGroups.js";
import TestRenderer from "react-test-renderer";

test("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ToolGroups />, div);
});
