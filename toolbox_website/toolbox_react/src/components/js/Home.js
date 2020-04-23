import React from "react";
import "../css/Home.css";
import FindTools from "./FindTools";
import logo from "../../nut.svg";

export default function Home() {
  return (
    <div className="home">
      <div className="container">
        <FindTools />
      </div>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}
