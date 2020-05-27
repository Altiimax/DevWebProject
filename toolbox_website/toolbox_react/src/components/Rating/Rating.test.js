import React from "react";
import ReactDOM from "react-dom";
import Rating from "./Rating.js";

test("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Rating />, div);
});
