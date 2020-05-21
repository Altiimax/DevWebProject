import React, { useEffect } from "react";
import { apiRequest } from "../../api/apiRequest.js";
import { userFromToken } from "../../utils";
import "./MyProfile.css";
import nut from "../../nut.svg";

function MyProfile(props){
    //const [user] = useState(props.user_id);
        
    useEffect(() => {
        getProfile();
        document.getElementById("profileSection").innerHTML = "My Profile";
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
        document.getElementById("alias").innerHTML = "Alias : "+data_profile.alias;
        document.getElementById("birthDate").innerHTML = data_profile.birthDate;
        document.getElementById("email").innerHTML = data_profile.email;
    }

    return(
        <div className="wrapper_myProfile">
          <div className="container_myProfile">
            <div className="img_myProfileContainer">
              <img src={nut} alt="here" className="img_myProfile" />
            </div>
            <div className="content_myProfile">
              <div className="subContent_myProfile">
                <h1 id="name">Loading...</h1>
                <span id="alias"></span>
                <br/>
                <span id="email"></span>
                <div id="birthDate"></div>
                <button className="button_myProfile">Change my profile informations</button>
              </div>
            </div>
          </div>
        </div>
    );
}
export default MyProfile;