import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/js/Home";
import SignUp from "./components/js/SignUp";
import SignIn from "./components/js/SignIn";
import Profile from "./components/js/Profile";
import MyGroups from "./components/js/MyGroups";
import MyTools from "./components/js/MyTools";
import Help from "./components/js/Help";
import Contact from "./components/js/Contact";
import AboutUs from "./components/js/AboutUs";
import apiExample from "./api/apiExample";
import Terms from "./components/js/Terms";
import NotFound from "./components/js/NotFound";
//import Greet from "./components/js/Greetings";
//import Menu from "./components/js/Menu";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/myGroups" component={MyGroups} />
      <Route exact path="/myTools" component={MyTools} />
      <Route exact path="/help" component={Help} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/about-us" component={AboutUs} />
      <Route exact path="/terms" component={Terms} />

      <Route exact path="/apiExample" component={apiExample} />
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
