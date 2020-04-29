import React from "react";
import ReactDOM from "react-dom";
import AddTools from "./AddTools.js";
import TestRenderer from "react-test-renderer";
test("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddTools />, div);
});

/*
Test de la snapshot (a faire que si le component ne bouge pas trop dans le temps)
Ce test ajoute un dossier _snaphsot_dans lequel est contenu toutes les snapshots
*/
it("renders a form", () => {
  const testRenderer = TestRenderer.create(<AddTools />);
  const testInstance = testRenderer.toJSON();
  expect(testInstance).toMatchSnapshot();
});
