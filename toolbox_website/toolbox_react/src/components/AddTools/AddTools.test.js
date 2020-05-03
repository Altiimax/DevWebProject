import React from "react";
import ReactDOM from "react-dom";
import AddTools from "./AddTools.js";
<<<<<<< Updated upstream
it("render without crashing", () => {
=======
import TestRenderer from "react-test-renderer";

test("render without crashing", () => {
>>>>>>> Stashed changes
  const div = document.createElement("div");
  ReactDOM.render(<AddTools />, div);
});
