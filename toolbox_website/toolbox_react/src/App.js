import React, { Component } from "react";
import Header from "./components/Header/Header.js";
import Routes from "./Routes";
import Footer from "./components/Footer/Footer.js";
import SignIn from "./components/Sign/SignIn.js";
import SignUp from "./components/Sign/SignUp.js";
import SignOut from "./components/Sign/SignOut.js";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signed_in: false,
      user_id: 0,
      show_popUp: "",
    };
  }

  display_popUp = (type) => {
    //this.props.history.push('/');
    this.setState({ show_popUp: type });
  };

  popUp = () => {
    let p;
    switch (this.state.show_popUp) {
      case "sign-in":
        p = <SignIn showPopUp={true} handle_signIn={this.handle_signIn} />;
        break;
      case "sign-up":
        p = <SignUp showPopUp={true} handle_signUp={this.handle_signIn} />;
        break;
      case "sign-out":
        p = <SignOut showPopUp={true} handle_signOut={this.handle_signOut} />;
        break;
      default:
        p = null;
    }
    return p;
  };

  handle_signIn = (u_id, u_token) => {
    localStorage.setItem('token',u_token);
    this.setState({
      user_id: u_id,
      signed_in: true,
    });
  };


  handle_signOut = () => {
    localStorage.removeItem('token');
    this.setState({
      user_id: 0,
      signed_in: false,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="bg">
          <div className="Header">
            <Header
              signed_in={this.state.signed_in}
              display_popUp={this.display_popUp}
            />
          </div>

          <div className="Body">
            <Routes user_id={this.state.user_id} />

            <div id="bodyContent">
              {this.popUp()} {/*every popup will be displayed here*/}
            </div>
          </div>
        </div>

        <div className="Footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
