import React from "react";
import ReactDOM from "react-dom";
import ToolDetail from "./ToolDetail.js";
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ToolDetail />, div);
});
