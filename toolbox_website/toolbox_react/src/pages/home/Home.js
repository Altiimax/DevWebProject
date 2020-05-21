import React from "react";
import FindTools from "../../components/FindTools/FindTools.js";
import "./Home.css";
import Map from "../../components/Map/Map.js";
import {apiRequest} from "../../api/apiRequest.js";

export default function Home() {

  return (
    <div className="Home">
      <div id="homeContentWrapper">
        <div className="SearchFrom">
          <FindTools />
        </div>
        <div className="searchList" id="list"></div>
        <div className="searchMap">
          <Map />
        </div>
      </div>
    </div>
  );
}

