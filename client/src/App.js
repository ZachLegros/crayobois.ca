import React from "react";
import Home from "./components/home/home";
import Cvs from "./components/cvs/cvs";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavLinksProvider } from "./components/context/navLinksContext";
import GlobalState from "./components/context/GlobalState";
import AuthState from "./components/context/AuthState";
import SignIn from "./components/signInAndSignUp/signIn";
import SignUp from "./components/signInAndSignUp/signUp";

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
              <AuthState>
                <Route
                  path="/se-connecter"
                  exact
                  render={props => <SignIn {...props} />}
                />
                <Route
                  path="/creer-un-compte"
                  exact
                  render={props => <SignUp {...props} />}
                />
              </AuthState>
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
