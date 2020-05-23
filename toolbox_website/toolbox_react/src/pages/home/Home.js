import React from "react";
import FindTools from "../../components/FindTools/FindTools.js";
import "./Home.css";


export default function Home() {

  return (
    <div className="Home">
      <div id="homeContentWrapper">
        <div id="homeSearch">
          <div className="SearchFrom">
            <FindTools />
          </div>
          <div className="searchList" id="list"></div>
        </div>
        <div id="homeGroupDetail"></div>
        <div id="searchMap"></div>
      </div>
    </div>
  );
}

