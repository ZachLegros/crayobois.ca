import React, { useState } from "react";
import Nav from "./components/nav/nav";
import Home from "./components/home/home";
import Cvs from "./components/cvs/cvs";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavLinksProvider } from "./components/context/navLinksContext";
import GlobalState from "./components/context/GlobalState";

const App = () => {
  return (
    <React.Fragment>
      <GlobalState>
        <NavLinksProvider>
          <Nav />
        </NavLinksProvider>
        <Router>
          <Switch>
            <Route path="/" exact render={props => <Home {...props} />} />
            <Route
              path="/creez-votre-stylo"
              exact
              render={props => <Cvs {...props} />}
            />
          </Switch>
        </Router>
      </GlobalState>
    </React.Fragment>
  );
};

export default App;
