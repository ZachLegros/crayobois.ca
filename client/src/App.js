import React from "react";
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
          <Router>
            <Switch>
              <Route path="/" exact render={props => <Home {...props} />} />
              <Route
                path="/creez-votre-stylo"
                exact
                render={props => <Cvs {...props} />}
              />
              <Route
                path="/"
                render={() => (
                  <React.Fragment>
                    <div>404</div>
                    <div>Page not found</div>
                  </React.Fragment>
                )}
              />
            </Switch>
          </Router>
        </NavLinksProvider>
      </GlobalState>
    </React.Fragment>
  );
};

export default App;
