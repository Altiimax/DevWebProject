import React from "react";
import ReactDOM from "react-dom";
import CreateGroup from "./CreateGroup.js";

test("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CreateGroup />, div);
});
