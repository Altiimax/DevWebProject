import React from "react";
import FindTools from "../../components/FindTools/FindTools.js";
import "./Home.css";
import Map from "../../components/Map/Map.js";
import {apiRequest} from "../../api/apiRequest.js";

export default function Home() {

  function retrieveAllTool(){
    let endpoint = "/api/tools/";
    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let rep = JSON.parse(this.responseText);
          let onlyOnce = [];
          for(let e of rep){
              if (!onlyOnce.includes(e.toolName)){
                  onlyOnce.push(e.toolName);
              }
          }
          onlyOnce.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
          let listTool = "<ul>";
          for(let f of onlyOnce){
            listTool+= "<li><button onclick={getGroups(f)}>"+f+"</button></li>";
          }
          listTool +="</ul>"
          document.getElementById("allTools").innerHTML = listTool;
        }
      }
    });

    req.send();
  }

  function getGroups(tool_name){
    let endpoint = "/api/tools/"+tool_name+"/groups/";
    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let rep = JSON.parse(this.responseText);
          console.log(rep);
        }
      }
    });

    req.send();
  }

  return (
    <div className="Home">
      <div id="homeContentWrapper">
        <div className="SearchFrom">
          <FindTools />
        </div>
        <div className="searchList" id="list"></div>
        <div id="allTools">
          <button className="searchByTool" onClick={retrieveAllTool}>Retrieve all tools</button>
        </div>
        <div className="searchMap">
          <Map />
        </div>
      </div>
    </div>
  );
}

