import React from "react";
import FindTools from "../../components/FindTools/FindTools.js";
import "./Home.css";
import Test from "../../components/test.js";

export default function Home() {
  return (
    <div className="Home">
      <div className="SearchFrom">
        <FindTools />
      </div>
      <div className="QuickLook">Ceci est provisoire</div>
    </div>
  );
}
//<Test />
