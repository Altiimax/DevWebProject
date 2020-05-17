import React, { useRef, useEffect } from "react";
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
  let id = useRef();
  id.current = props.id; 
  let picture = useRef();
  picture.current = props.picture;
  let name = useRef();
  name.current = props.name;
  let description = useRef();
  description.current = props.desc;
  let price = useRef();
  price.current = props.price; 
  let PopUp = useRef();
  PopUp.current = props.popUp;
  
  useEffect(() => {
    id.current = props.id;
    picture.current = props.picture;
    name.current = props.name;
    description.current = props.desc;
    price.current = props.price;
    PopUp.current = props.popUp;
  });

  function displayDetailPopup(idT){
    let tdl = <ToolDetail showPopUp={true} toolId={idT}/>;
    ReactDOM.render(tdl, document.getElementById("toolPopup"));
  }

  function displayGroupsPopup(idT){
    let tdl = <ToolGroups showPopUp={true} toolId={idT} toolName={name.current}/>;
    ReactDOM.render(tdl, document.getElementById("toolPopup"));
  }

  return (
    <div>
      <div 
        className="oneTool" 
        onClick={ () => {
            if(PopUp.current === "detail"){
              displayDetailPopup(id.current);
            }
            else if (PopUp.current === "groups"){
              displayGroupsPopup(id.current);
            }
            else {
              return null;
            }
          }
        } 
      >
        <div className="imageTool">
          <img
            src={url + picture.current}
            alt="--The tool pic is not found--"
          />
        </div>
        <div className="informTool">
          <h4>{name.current}</h4>
        </div>
        <div className="priceTool">Price : {price.current} €</div>  
        <div className="toolTipText">{description.current}</div>
      </div> 
      <div id="toolPopup"></div>
    </div>
  );


}

export default MyTools;
