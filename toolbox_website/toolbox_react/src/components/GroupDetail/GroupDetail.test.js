import React from "react";
import ReactDOM from "react-dom";
import GroupDetail from "./GroupDetail.js";
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<GroupDetail />, div);
});
