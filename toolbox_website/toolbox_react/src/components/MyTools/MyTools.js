import React, { useState } from "react";
import { Table } from "react-bootstrap";
import "./MyTools.css";

function MyTools(props) {
  //pour les images il faudrait pouvoir les faire défiler onHover!!! Ici qu'une seule affichée..
  const [picture] = useState(props.picture);
  const [name] = useState(props.name);
  const [description] = useState(props.desc);
  const [price] = useState(props.price);
  const [review] = useState(props.review);

  return (
    <div className="oneTool">
      <div className="imageTool">
        <img
          src={picture}
          alt="--Image of the tool not found--"
          height="auto"
          width="100%"
        />
      </div>
      <div className="informTool">
        <h4>{name}</h4>
      </div>
      <div className="priceTool">Price : {price} €</div>
    </div>
  );
}

export default MyTools;
/*
<div>
<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Image</th>
      <th>Name</th>
      <th>Owner</th>
      <th>Renting infos</th>
      <th>State</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Image not found</td>
      <td>Screwdriver</td>
      <td>Bob</td>
      <td>
        Was borrowed on 20/04/2012 and must be given back before
        24/05/2012
      </td>
      <td>Used</td>
    </tr>
    <tr>
      <td>Image not found</td>
      <td>Screwdriver</td>
      <td>Bob</td>
      <td>
        Was borrowed on 20/04/2012 and must be given back before
        24/05/2012
      </td>
      <td>Used</td>
    </tr>
  </tbody>
</Table>
</div>
*/
