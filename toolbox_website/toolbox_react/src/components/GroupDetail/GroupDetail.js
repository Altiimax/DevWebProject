import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { apiRequest } from "../../api/apiRequest.js";
import tokenIsValid, { userFromToken } from "../../utils";
import Tool from "../Tool/Tool.js";

import "./GroupDetail.css";

function GroupDetail(props) {
  let group = useRef();
  group.current = props.groupObj;
  let content = props.content;
  let toolPopup = useRef();
  toolPopup.current = "none";
  let groups = [];

  useEffect(() => {
    group.current = props.groupObj;
    if(content ==="profile"){
      document.getElementById("myGroupProfile").style.display="none"; 
      document.getElementById("profileSection").innerHTML = "My Groups - Detail";
      document.getElementById("groupDetailJoin").style.display="none";
      toolPopup.current = "detail"; 
    }
    else{
      getMyGroupsApiRequest();
      toolPopup.current = "none";
    }
    document.getElementById("GroupDetail").style.display="initial";
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
                popUp={toolPopup}
              />
            );
          }
          ReactDOM.render(toolList, document.getElementById("GroupDetailTools"));
        }
      }
    });

    req.send();

  }
  
  function apiAddMember(user_id, group_id){
    let data = JSON.stringify({"id_person":user_id,"id_groupName":group_id,"groupAdmin":"False"})
    console.log(data);
    let endpoint = "/api/groups/members/";

    let req = new apiRequest();
    req.open("POST", `${endpoint}`);
    req.contentType("json");

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 201) {
          console.log(this.responseText);
        }
      }
    });

    req.send(data);
  }
  
  function getMyGroupsApiRequest(){
    let endpoint = "/api/persons/" + userFromToken().id + "/groups/";

    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let resp = JSON.parse(this.responseText);
          groups=resp;
        }
      }
    });

    req.send();
  }

  function addGroup () {
    if (tokenIsValid()) {
      console.log(groups);
      let addG = true;
      for(let i in groups){
        if(group.current.id_groupName === groups[i].group.id_groupName){
          ReactDOM.render("You're already in that group", document.getElementById("cannotJoin"));
          addG=false;
        }
      }
      if(addG){
        console.log("ici");
        apiAddMember(userFromToken().id,group.current.id_groupName);
      }
    } else {
      ReactDOM.render("You're not connected", document.getElementById("cannotJoin"));
    }
  }

  return (
    <div>
      <div id="GroupDetailComp">
        <div id="GroupDetailName">
          <h1>{group.current.id_groupName}</h1>
          <h4> Type: {group.current.groupType}</h4>
          <h4> Location: {group.current.town.townName}</h4>
          <button id="groupDetailJoin" onClick={addGroup}>Join group</button>
          <span id="cannotJoin"></span>
        </div>
        <div id="GroupDetailDescription">{group.current.groupDescription}</div>
        <div id="GroupDetailTools"></div>
      </div>
      <div id="ToolDetail"></div>
    </div>
    );
}

export default GroupDetail;