import React, { Component } from "react";
import tokenIsValid, {getUserProfileAPIRequest, userFromToken} from "./utils";
import history from "./history";
import Routes from "./Routes";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import SignIn from "./components/Sign/SignIn.js";
import SignUp from "./components/Sign/SignUp.js";
import SignOut from "./components/Sign/SignOut.js";
import { apiRequest } from "./api/apiRequest.js";

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

  componentDidMount() {
    if (tokenIsValid()) {
      let token = localStorage.getItem('token');
      let endpoint = "/api/persons/login_token/?token=";
      let req = new apiRequest();
      req.open("GET", `${endpoint}${token}`);

      let self = this;
      req.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            let user = this.responseText[0];
            self.setState({
              user_id: user.id_person,
              signed_in: true,
            });
          }
          if (this.status === 404) {
            history.push('/');
          }
        }
      });
  
      req.send();
      getUserProfileAPIRequest(userFromToken().id);
    }
    else{
      document.getElementById("userNameDisplay").innerHTML = "";
    }
  }

  display_popUp = (type) => {
    this.setState({ show_popUp: type });
  };

  popUp = () => {
    let p;
    switch (this.state.show_popUp) {
      case "sign-in":
        p = <SignIn showPopUp={true} handle_signIn={this.handle_signIn} />;
        break;
      case "sign-up":
        p = <SignUp showPopUp={true} handle_signIn={this.handle_signIn} />;
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
    getUserProfileAPIRequest(userFromToken().id);
    this.setState({
      user_id: u_id,
      signed_in: true,
    });
  };


  handle_signOut = () => {
    localStorage.removeItem('token');
    document.getElementById("userNameDisplay").innerHTML = "";
    history.push('/');
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
            <Routes/>

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
