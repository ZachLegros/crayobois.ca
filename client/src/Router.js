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
import Contact from "./components/contact/contact";
import Gallery from "./components/gallery/gallery";

const RouterComponent = () => {
  const context = useContext(NavContext);
  const authContext = useContext(AuthContext);
  const [navigation, setNavigation] = context.navigation;
  const [userNav, setUserNav] = authContext.userNav;

  return (
    <React.Fragment>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route path="/" exact render={props => <Home {...props} />} />
            <Route
              path="/galerie"
              exact
              render={props => <Gallery {...props} />}
            />
            <Route
              path="/contact"
              exact
              render={props => <Contact {...props} />}
            />
            <Route
              path="/creez-votre-stylo"
              exact
              render={props => <LoggedInChecker {...props} />}
            />
            <Route
              path="/utilisateur"
              exact
              render={props => <User {...props} content="" />}
            />
            <Route
              path="/utilisateur/profil"
              exact
              render={props => <User {...props} content="profile" />}
            />
            <Route
              path="/utilisateur/panier"
              exact
              render={props => <User {...props} content="cart" />}
            />
            <Route
              path="/utilisateur/commandes"
              exact
              render={props => <User {...props} content="orders" />}
            />
            <Route
              path="/utilisateur/connexion"
              exact
              render={props => <SignIn {...props} content="" />}
            />
            <Route
              path="/utilisateur/creer-un-compte"
              exact
              render={props => <SignUp {...props} content="" />}
            />
            <Route
              path="/utilisateur/nouveau-mot-de-passe"
              exact
              render={props => <ResetPassword {...props} content="" />}
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
        </div>
      </Router>
    </React.Fragment>
  );
};

export default RouterComponent;
