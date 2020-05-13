import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/home/Home.js";
import Profile from "./pages/profile/Profile.js";
import Help from "./pages/help/Help.js";
import Contact from "./pages/contact/Contact.js";
import AboutUs from "./pages/aboutUs/AboutUs.js";
import Terms from "./pages/terms/Terms.js";
import NotFound from "./pages/notFound/NotFound.js";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about-us" component={AboutUs} />
        <Route exact path="/terms" component={Terms} />
        <Route>
          <NotFound />
        </Route>
        {/* Finally, catch all unmatched routes */}
      </Switch>
    );
  }
}

export default Routes;
