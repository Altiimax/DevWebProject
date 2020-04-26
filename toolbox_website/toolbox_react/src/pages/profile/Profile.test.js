import React from "react";
import ReactDOM from "react-dom";
import Profile from "./Profile.js";
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Profile />, div);
});
