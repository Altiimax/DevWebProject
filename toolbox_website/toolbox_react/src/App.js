import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {BrowserRouter as Router,Route,Link,NavLink} from "react-router-dom";
import Greet from "./components/Greetings";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import Menu from "./components/Menu";
import Help from "./components/Help";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <div className="App">
          <header className="App-header">
            <div className="Greetings">
              <Greet name="Host" />
            </div>
            <div>
              <Menu/>
            </div>
            <img src={logo} className="App-logo" alt="logo" />
          </header>
        </div>
      </Route>
      <Route exact path="/sign-up" component={SignUp}/>
      <Route exact path="/sign-in" component={SignIn}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/help" component={Help}/>
    </Router>
  );
}

export default App;
