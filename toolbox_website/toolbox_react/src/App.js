import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {BrowserRouter as Router,Route} from "react-router-dom";
import Greet from "./components/js/Greetings";
import SignUp from "./components/js/SignUp";
import SignIn from "./components/js/SignIn";
import Profile from "./components/js/Profile";
import Menu from "./components/js/Menu";
import Help from "./components/js/Help";
import Header from "./components/js/Header";
import Footer from "./components/js/Footer";
import AboutUs from "./components/js/AboutUs"
import Contact from "./components/js/Contact";

import apiExample from "./apiExample";

function App() {
  return (
    <>
    <Header>
      <Header/>
    </Header>

    <Router>
      
      <Route exact path="/">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
        </div>
      </Route>

      <Route exact path="/Contact" component={Contact}/>
      <Route exact path="/about-us" component={AboutUs}/>
      <Route exact path="/sign-up" component={SignUp}/>
      <Route exact path="/sign-in" component={SignIn}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/help" component={Help}/>

      <Route exact path="/apiExample" component={apiExample}/>
    </Router>

    <Footer>
      <Footer/>
    </Footer>
    </>
  );
}

export default App;
