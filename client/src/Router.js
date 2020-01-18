import React, { useContext } from "react";
import Home from "./components/home/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import User from "./components/signInAndSignUp/user";
import LoggedInChecker from "./components/cvs/loggedInChecker";
import ResetPassword from "./components/resetPassword/resetPassword";
import Nav from "./components/nav/nav";
import NavContext from "./components/context/navLinksContext";

const RouterComponent = () => {
  const context = useContext(NavContext);
  const [navigation, setNavigation] = context.navigation;

  return (
    <React.Fragment>
      <Nav />
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Home
                {...props}
                onEnter={() => {
                  setNavigation("home");
                }}
              />
            )}
          />
          <Route
            path="/creez-votre-stylo"
            exact
            render={props => (
              <LoggedInChecker
                {...props}
                onEnter={() => {
                  setNavigation("cvs");
                }}
              />
            )}
          />
          <Route
            path="/utilisateur"
            exact
            render={props => (
              <User
                {...props}
                onEnter={() => {
                  setNavigation("dashboard");
                }}
              />
            )}
          />
          <Route
            path="/utilisateur/nouveau-mot-de-passe"
            exact
            render={props => (
              <ResetPassword
                {...props}
                onEnter={() => {
                  setNavigation("reset-pass");
                }}
              />
            )}
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
    </React.Fragment>
  );
};

export default RouterComponent;
