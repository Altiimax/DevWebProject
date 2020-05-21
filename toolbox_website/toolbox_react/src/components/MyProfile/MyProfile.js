import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { apiRequest } from "../../api/apiRequest.js";
import { userFromToken, getUserProfileAPIRequest } from "../../utils";
import "./MyProfile.css"
function MyProfile(props){
    const [user] = useState(props.user_id);
    const [ProfilData, setProfilData] = useState();
    
    useEffect(() => {
        getProfile();
    });


    function getProfile(){
        let endpoint = "/api/persons/" + userFromToken().id +"/";

    let req = new apiRequest();
    req.open("GET", `${endpoint}`);

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let resp = JSON.parse(this.responseText);
          console.log(resp);
          displayProfile(resp[0]);
        }
      }
    });

    req.send();
    }

    function displayProfile(data_profile){
        document.getElementById("name").innerHTML = data_profile.firstName + " "+ data_profile.lastName;
        document.getElementById("alias").innerHTML = data_profile.alias;
        document.getElementById("birthDate").innerHTML = data_profile.birthDate;
        document.getElementById("email").innerHTML = data_profile.email;
    }

    return(
        <div className="myProfileContent">
            <div id="name"></div>
            <div id ="alias"></div>
            <div id="birthDate"></div>
            <div id="email"></div>
        </div>
    );
}
export default MyProfile;