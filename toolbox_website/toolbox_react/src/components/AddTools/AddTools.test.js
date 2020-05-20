import React from "react";
import ReactDOM from "react-dom";
import AddTools from "./AddTools.js";
import TestRenderer from "react-test-renderer";

test("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddTools />, div);
});
