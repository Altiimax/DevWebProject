import React from "react";
import ReactDOM from "react-dom";
import FormTool from "./FormTool.js";

test("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FormTool />, div);
});
