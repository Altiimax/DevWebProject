import React, { Component } from "react";
import Header from "./components/js/Header";
import Routes from "./Routes";
import Footer from "./components/js/Footer";
import SignIn from "./components/js/SignIn";
import SignUp from "./components/js/SignUp";
import SignOut from "./components/js/SignOut";

import "./App.css";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signed_in: false,
      user_id: "",
      show_popUp: "",
    }
  }

  display_popUp = (type) => {
    this.setState({show_popUp: type})
  }
  
  popUp = () =>{
    let p;
    switch (this.state.show_popUp){
      case 'sign-in':
        p = <SignIn showPopUp={true} handle_signIn={this.handle_signIn}/>;
        break;
      case 'sign-up':
        p = <SignUp showPopUp={true} handle_signUp={this.handle_signUp}/>;
        break;
      case 'sign-out':
        p = <SignOut showPopUp={true} handle_signOut={this.handle_signOut}/>;
        break;
      default:
        p = null;
    }
    return p;
  }

  handle_signIn = (u_id) => {
    this.setState({
      user_id: u_id,
      signed_in: true,
    })
  }

  handle_signUp = (u_id) => {
    this.setState({
      user_id: u_id,
      signed_in: true,
    })
  }

  handle_signOut = () => {
    this.setState({
      user_id: "",
      signed_in: false,
    })
  }

  render() {
    
    return (
      <div>

        <Header signed_in={this.state.signed_in} display_popUp={this.display_popUp}/>
        <Routes />
      
        <div id="bodyContent">
          {this.popUp()} {/*every popup will be displayed here*/}
        </div>
      
        <Footer />

      </div>
    );
  }

}

export default App;
