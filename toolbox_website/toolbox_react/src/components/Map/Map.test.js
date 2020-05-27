import React from "react";
import ReactDOM from "react-dom";
import Map from "./Map.js";

test("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Map />, div);
});
