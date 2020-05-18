import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import ToolDetail from "../ToolDetail/ToolDetail.js";
import ToolOptions from "../ToolOptions/ToolOptions.js";

import "./SlideShow.css";
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
  let pictures = useRef();
  pictures.current = props.pictures;
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
    pictures.current = props.pictures;
    name.current = props.name;
    description.current = props.desc;
    price.current = props.price;
    PopUp.current = props.popUp;
    showSlides();
  });

  function displayDetailPopup(idT){
    let tdl = <ToolDetail showPopUp={true} toolId={idT}/>;
    ReactDOM.render(tdl, document.getElementById("toolPopup"));
  }

  function displayGroupsPopup(idT){
    let tdl = <ToolOptions showPopUp={true} toolId={idT} toolName={name.current}/>;
    ReactDOM.render(tdl, document.getElementById("toolPopup"));
  }

  function displayImages(){
    let imgHtml = [];
    let key_i = 0;
    for(let img of pictures.current){
      imgHtml.push(<img key={key_i} className={`mySlides${id.current}  mySlides`} src={url + img.image} alt={`Tool pic ${img.id_toolImage}`}/>);
      key_i ++;
    }
    return imgHtml;
  }

  let slideIndex = 0;
  function showSlides() {
    let i;
    let slides = document.getElementsByClassName(`mySlides${id.current}`);
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 2 seconds
  }


  return (
    <div>
      <div 
        className="oneTool" 
        onClick={ () => {
            if(PopUp.current === "detail"){
              displayDetailPopup(id.current);
            }
            else if (PopUp.current === "options"){
              displayGroupsPopup(id.current);
            }
            else {
              return null;
            }
          }
        } 
      >
        <div id={`imageTool${id.current}`} className="imageTool">{displayImages()}</div>
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


