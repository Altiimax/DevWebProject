import React from "react";
import FindTools from "./FindTools";
import "../css/Home.css";

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
