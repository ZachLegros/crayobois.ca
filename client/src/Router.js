import React, { useContext } from "react";
import Home from "./components/home/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import User from "./components/signInAndSignUp/user";
import LoggedInChecker from "./components/cvs/loggedInChecker";
import ResetPassword from "./components/resetPassword/resetPassword";
import Nav from "./components/nav/nav";
import NavContext from "./components/context/navLinksContext";
import AuthContext from "./components/context/authContext";
import SignIn from "./components/signInAndSignUp/signIn";
import SignUp from "./components/signInAndSignUp/signUp";

const RouterComponent = () => {
  const context = useContext(NavContext);
  const authContext = useContext(AuthContext);
  const [navigation, setNavigation] = context.navigation;
  const [userNav, setUserNav] = authContext.userNav;

  return (
    <React.Fragment>
      <Router>
        <Nav />
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
                content=""
              />
            )}
          />
          <Route
            path="/utilisateur/profil"
            exact
            render={props => (
              <User
                {...props}
                content="profile"
                onEnter={() => {
                  setNavigation("dashboard");
                }}
              />
            )}
          />
          <Route
            path="/utilisateur/panier"
            exact
            render={props => (
              <User
                {...props}
                content="cart"
                onEnter={() => {
                  setNavigation("dashboard");
                }}
              />
            )}
          />
          <Route
            path="/utilisateur/commandes"
            exact
            render={props => (
              <User
                {...props}
                content="orders"
                onEnter={() => {
                  setNavigation("dashboard");
                }}
              />
            )}
          />
          <Route
            path="/utilisateur/connexion"
            exact
            render={props => (
              <SignIn
                {...props}
                content=""
                onEnter={() => {
                  setNavigation("dashboard");
                }}
              />
            )}
          />
          <Route
            path="/utilisateur/creer-un-compte"
            exact
            render={props => (
              <SignUp
                {...props}
                content=""
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
                content=""
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
