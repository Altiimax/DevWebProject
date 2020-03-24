import React from "react";
/**
 * This component is used to render a personalised greeting message.
 * It rendre the greetings message in h1.
 * @param {*} props
 */

const Profile = props => {
  return (
    //ici le /n ne fonctionne pas!
    <div>
      <h3>
        Welcome to the application {props.name}! This application is on
        construction!
        {"\n"} What would you do?
      </h3>
      <div className="buttonsProfile">
        <button className="myToolsButton">My Tools</button>
        <div class="divider"/>
        <button className="myGroupsButton">My groups</button>
        <div class="divider"/>
        <button className="helpButton">Help</button>
        <div class="divider"/>
        <button className="myProfileButton">My Profile</button>
      </div>
    </div>
  );
};
export default Profile;
