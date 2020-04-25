import React, { Component }from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/js/Home";
import Profile from "./components/js/Profile";
import Help from "./components/js/Help";
import Contact from "./components/js/Contact";
import AboutUs from "./components/js/AboutUs";
import Terms from "./components/js/Terms";
import NotFound from "./components/js/NotFound";


class Routes extends Component {
 
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact path='/profile'
          render={(props) => < Profile user_id={this.props.user_id}/>}
        />
        <Route exact path="/help" component={Help} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about-us" component={AboutUs} />
        <Route exact path="/terms" component={Terms} />
        <Route><NotFound /></Route>  {/* Finally, catch all unmatched routes */}
      </Switch>
    );
  }
}

export default Routes;
