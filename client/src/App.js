import React, { useContext } from "react";
import Home from "./components/home/home";
import Cvs from "./components/cvs/cvs";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavState from "./components/context/navState";
import GlobalState from "./components/context/GlobalState";
import AuthState from "./components/context/AuthState";
import User from "./components/signInAndSignUp/user";
import LoggedInChecker from "./components/cvs/loggedInChecker";
import ResetPassword from "./components/resetPassword/resetPassword";
import Nav from "./components/nav/nav";

const App = () => {
  return (
    <React.Fragment>
      <GlobalState>
        <AuthState>
          <NavState>
            <Nav />
            <Router>
              <Switch>
                <Route path="/" exact render={props => <Home {...props} />} />
                <Route
                  path="/creez-votre-stylo"
                  exact
                  render={props => <LoggedInChecker {...props} />}
                />
                <Route
                  path="/utilisateur"
                  exact
                  render={props => <User {...props} />}
                />
                <Route
                  path="/utilisateur/nouveau-mot-de-passe"
                  exact
                  render={props => <ResetPassword {...props} />}
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
          </NavState>
        </AuthState>
      </GlobalState>
    </React.Fragment>
  );
};

export default App;
