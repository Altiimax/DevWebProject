import React from "react";
import ReactDOM from "react-dom";
import MyTools from "./Tool.js";
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MyTools />, div);
});
