import React from "react";
import Nav from "./components/nav/nav";
import Home from "./components/home/home";
import Cvs from "./components/cvs/cvs";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavLinksProvider } from "./components/context/navLinksContext";
import { CvsProvider } from "./components/context/cvsContext";

function App() {
  return (
    <React.Fragment>
      <CvsProvider>
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
      </CvsProvider>
    </React.Fragment>
  );
}

export default App;
