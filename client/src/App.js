import React, { useState, useEffect, useContext } from "react";
import Nav from "./components/nav/nav";
import Home from "./components/home/home";
import Cvs from "./components/cvs/cvs";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavLinksProvider } from "./components/navLinksContext";

function App() {

  return (
    <React.Fragment>
      <NavLinksProvider>
        <Nav />
      </NavLinksProvider>
      <Router>
        <Route path="/" exact render={props => <Home {...props} />} />
          <Route
            path="/creez-votre-stylo"
            exact
            render={props => <Cvs {...props} />}
          />
      </Router>
    </React.Fragment>
  );
}

export default App;
