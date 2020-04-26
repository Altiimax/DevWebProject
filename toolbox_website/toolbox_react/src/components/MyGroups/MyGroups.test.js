import React from "react";
import ReactDOM from "react-dom";
import MyGroups from "./MyGroups.js";
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MyGroups />, div);
});
