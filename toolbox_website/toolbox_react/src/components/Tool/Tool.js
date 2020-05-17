import React, { useState } from "react";
import ReactDOM from "react-dom";
import ToolDetail from "../ToolDetail/ToolDetail.js";
import ToolGroups from "../ToolGroups/ToolGroups.js";

import "./Tool.css";

let isInDev = require('../../prod.json').inDev;
let url = "http://127.0.0.1:8000";
if(!isInDev){
  url = "";
}

function MyTools(props) {
  //pour les images il faudrait pouvoir les faire défiler onHover!!! Ici qu'une seule affichée..
  const [id] = useState(props.id); 
  const [picture] = useState(props.picture);
  const [name] = useState(props.name);
  const [description] = useState(props.desc);
  const [price] = useState(props.price); 
  const [PopUp] = useState(props.popUp);
  
  function displayDetailPopup(id){
    let tdl = <ToolDetail showPopUp={true} toolId={id}/>;
    ReactDOM.render(tdl, document.getElementById("toolPopup"));
  }

  function displayGroupsPopup(id){
    let tdl = <ToolGroups showPopUp={true} toolId={id} toolName={name}/>;
    ReactDOM.render(tdl, document.getElementById("toolPopup"));
  }

  return (
    <div>
      <div 
        className="oneTool" 
        onClick={ () => {
            if(PopUp === "detail"){
              displayDetailPopup(id);
            }
            else if (PopUp === "groups"){
              displayGroupsPopup(id);
            }
            else {
              return null;
            }
          }
        } 
      >
        <div className="imageTool">
          <img
            src={url + picture}
            alt="--The tool pic is not found--"
          />
        </div>
        <div className="informTool">
          <h4>{name}</h4>
        </div>
        <div className="priceTool">Price : {price} €</div>  
        <div className="toolTipText">{description}</div>
      </div> 
      <div id="toolPopup"></div>
    </div>
  );


}

export default MyTools;
