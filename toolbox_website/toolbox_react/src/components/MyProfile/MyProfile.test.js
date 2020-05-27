import React from "react";
import ReactDOM from "react-dom";
import MyProfile from "./MyProfile.js";

test("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MyProfile />, div);
});
