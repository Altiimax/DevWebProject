import React from "react";
import ReactDOM from "react-dom";
import MyTools from "./MyTools.js";
import TestRenderer from "react-test-renderer";
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MyTools />, div);
});

/*
Test de la snapshot (a faire que si le component ne bouge pas trop dans le temps)
Ce test ajoute un dossier _snaphsot_dans lequel est contenu toutes les snapshots
*/
it("renders a table", () => {
  const testRenderer = TestRenderer.create(<MyTools />);
  const testInstance = testRenderer.toJSON();
  expect(testInstance).toMatchSnapshot();
});
