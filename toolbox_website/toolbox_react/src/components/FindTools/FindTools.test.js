import React from "react";
import ReactDOM from "react-dom";
import FindTools from "./FindTools.js";
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FindTools />, div);
});
