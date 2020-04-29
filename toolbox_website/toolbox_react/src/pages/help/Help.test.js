import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import Help from "./Help.js";
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Help />, div);
});
