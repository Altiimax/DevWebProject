import React from "react";
import FindTools from "../../components/FindTools/FindTools.js";
import "./Home.css";
import Search from "../../components/Search/Search.js";
import Map from "../../components/Map/Map.js";
//import Test from "../../components/test.js";

export default function Home() {
  const data2 =  [ {
    "id_groupName": "TestGroup1",
    "groupType": "public",
    "groupDescription": null,
    "groupRange": 50,
    "town": {
      "id_town": 1,
      "postCode": 1330,
      "townName": "Rixensart",
      "id_countryCode": "BE"
    }
  }]
  return (
    <div className="Home">
      <div className="SearchFrom">
        <FindTools />
      </div>
      <div className="QuickLook">Ceci est provisoire</div>
      <Search data={data2}/>
      <div className="searchList" id="list"></div>
      <div className="searchMap"></div>
    </div>
  );
}
//<Test />
