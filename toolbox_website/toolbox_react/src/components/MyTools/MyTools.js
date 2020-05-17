import React, { useState } from "react";
import ReactDOM from "react-dom";
import { apiRequest } from "../../api/apiRequest.js";
import Tool from "../Tool/Tool.js";
import AddTools from "../AddTools/AddTools.js";
import "./MyTools.css";


function MyTools(props) {
  const [user_id] = useState(props.user_id);

  function refreshToolList(){
    getMyToolsApi(user_id);
  }

  function getMyToolsApi(id_pers) {
    let endpoint = "/api/persons/" + id_pers + "/tools/";

    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    function displayPopup(){
      let p = <AddTools showPopUp={true} refreshToolList={refreshToolList}/>;
      ReactDOM.render(p, document.getElementById("MyToolsPopup"));
    }

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let resp = JSON.parse(this.responseText);
          let key_y = 999;
          let toolList = [
            <button key={key_y} className="oneTool" id="addOneTool" onClick={displayPopup}>
              Add new tool
            </button>,
          ];
          
          for (let i in resp) {      
            key_y++;
            toolList.push(
              <Tool 
                key={key_y}
                picture={resp[i].toolImages[0].image}
                name={resp[i].toolName}
                price={resp[i].toolPrice}
                desc={resp[i].toolDescription}
                id={resp[i].id_tool}
                popUp="groups"
              />
            );
          }
          ReactDOM.render(toolList, document.getElementById("MyToolsCont"));
        }
      }
    });

    req.send();
  };

  document.getElementById("profileSection").innerHTML = "My Tools";
  getMyToolsApi(user_id);

  return (
    <>
    <div id="MyToolsCont"></div>
    <div id="MyToolsPopup"></div>
    </>
  );
}

export default MyTools;
