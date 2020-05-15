import React, { useState } from "react";
//import { Table } from "react-bootstrap";
import "./Tool.css";

function MyTools(props) {
  //pour les images il faudrait pouvoir les faire défiler onHover!!! Ici qu'une seule affichée..
  const [picture] = useState(props.picture);
  const [name] = useState(props.name);
  const [description] = useState(props.desc);
  const [price] = useState(props.price);
  //const [review] = useState(props.review);

  return (
    <div className="oneTool">
      <div className="imageTool">
        <img
          src="../../../../toolbox_django/toolsImgs/spade2_1.jpeg"
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
