import React, { useState } from "react";
//import { Table } from "react-bootstrap";
import "./Tool.css";

let isInDev = require('../../prod.json').inDev;
let url = "http://127.0.0.1:8000";
if(!isInDev){
  url = "";
}

function MyTools(props) {
  //pour les images il faudrait pouvoir les faire défiler onHover!!! Ici qu'une seule affichée..
  const [picture] = useState(props.picture);
  const [name] = useState(props.name);
  const [description] = useState(props.desc);
  const [price] = useState(props.price);
  //const [review] = useState(props.review);
  console.log(picture)
  return (
    <div className="oneTool">
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
      <span className="toolTipText">{description}</span>
    </div>
  );
}

export default MyTools;
