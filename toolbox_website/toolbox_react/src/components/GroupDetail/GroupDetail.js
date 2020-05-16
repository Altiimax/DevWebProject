import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { apiRequest } from "../../api/apiRequest.js";
import Tool from "../Tool/Tool.js";

import "./GroupDetail.css";

function GroupDetail(props) {
  const [group] = useState(props.groupObj);

  useEffect(() => {
    document.getElementById("myGroupProfile").style.display="none";
    document.getElementById("GroupDetail").style.display="initial";
    getAllTools();
    document.getElementById("profileSection").innerHTML = "My Groups - Detail";
  });

  function getAllTools(){
    let endpoint = "/api/groups/tools/?groupName=" + group.id_groupName;

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
                picture={tools[t].tool.toolImages[0].image}
                name={tools[t].tool.toolName}
                price={tools[t].tool.toolPrice}
                desc={tools[t].tool.toolDescription}
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
    <div id="GroupDetailComp">
      <div id="GroupDetailName">
        <h1>{group.id_groupName}</h1>
        <h4> Type: {group.groupType}</h4>
        <h4> Location: {group.town.townName}</h4>
      </div>
      <div id="GroupDetailDescription">{group.groupDescription}</div>
      <div id="GroupDetailTools"></div>
    </div>
    );
}

export default GroupDetail;