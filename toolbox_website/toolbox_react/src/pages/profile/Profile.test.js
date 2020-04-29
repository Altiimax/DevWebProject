import React from "react";
import ReactDOM from "react-dom";
import Profile from "./Profile.js";
import { render } from "@testing-library/react";
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Profile />, div);
});
