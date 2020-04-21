import React, { Component } from "react";
import "../css/Header.css";

export default class SignOut extends Component {

  signOut(){
    window.location.replace("http://localhost:3000/"); //TODO PAS BIEN! A MODIFIER!
  }

  render() {
    return (
      <>
      <a className="Header_item" href="#" onClick={() => {this.signOut();}} variant="primary">Sign-out</a>
      {/*
      //todo : vider tous les state (sign in, my tools, ...) 
      //todo : redirection vers la page home
      */}
      </>
    )
  }
}
