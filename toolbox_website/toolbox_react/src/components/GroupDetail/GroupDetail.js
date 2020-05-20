import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { apiRequest } from "../../api/apiRequest.js";
import Tool from "../Tool/Tool.js";

import "./GroupDetail.css";

function GroupDetail(props) {
  let group = useRef();
  group.current = props.groupObj;

  useEffect(() => {
    group.current = props.groupObj;
    document.getElementById("myGroupProfile").style.display="none";
    document.getElementById("GroupDetail").style.display="initial";
    document.getElementById("profileSection").innerHTML = "My Groups - Detail";
    ReactDOM.render("", document.getElementById("GroupDetailTools"));
    getAllTools();
  });

  function getAllTools(){
    let endpoint = "/api/groups/tools/?groupName=" + group.current.id_groupName;

    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let tools = JSON.parse(this.responseText);
          let toolList = [];
          let key_t = 999;
          for (let t in tools) {      
            key_t++;
            toolList.push(
              <Tool 
                key={key_t}
                pictures={tools[t].tool.toolImages}
                name={tools[t].tool.toolName}
                price={tools[t].tool.toolPrice}
                desc={tools[t].tool.toolDescription}
                id={tools[t].tool.id_tool}
                popUp="detail"
              />
            );
          }
          ReactDOM.render(toolList, document.getElementById("GroupDetailTools"));
        }
      }
    });

    req.send();

  }

  return (
    <div>
      <div id="GroupDetailComp">
        <div id="GroupDetailName">
          <h1>{group.current.id_groupName}</h1>
          <h4> Type: {group.current.groupType}</h4>
          <h4> Location: {group.current.town.townName}</h4>
        </div>
        <div id="GroupDetailDescription">{group.current.groupDescription}</div>
        <div id="GroupDetailTools"></div>
      </div>
      <div id="ToolDetail"></div>
    </div>
    );
}

export default GroupDetail;