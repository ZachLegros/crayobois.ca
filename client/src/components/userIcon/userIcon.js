import React, { useState, useContext, useEffect } from "react";
import "./userIcon.css";
import AuthContext from "../context/authContext";
import { withRouter } from "react-router-dom";
import NavContext from "../context/navLinksContext";

const User = props => {
  const context = useContext(NavContext);
  const authContext = useContext(AuthContext);
  const [auth, setAuth] = useState(null);
  const [navigation, setNavigation] = context.navigation;
  let cart = authContext.cart[0];

  authContext.isInitialized().then(authState => {
    setAuth(authState);
  });

  return (
    <React.Fragment>
      <span
        onClick={() => {
          props.history.push("/utilisateur/profil");
          setNavigation("/utilisateur");
        }}
        className="nav-user-links"
      >
        {auth ? "mon compte" : "connexion"}
        {auth ? (
          <i className="fas fa-user nav-user-icons"></i>
        ) : (
          <i className="fas fa-sign-in-alt  nav-user-icons"></i>
        )}
      </span>
      {auth ? (
        <span
          onClick={() => {
            setNavigation("/utilisateur");
            props.history.push("/utilisateur/panier");
          }}
          className="nav-user-links"
        >
          panier {cart.length != 0 ? ("(" + cart.length + ")") : ""}<i className="fas fa-shopping-basket nav-user-icons"></i>
        </span>
      ) : (
        <React.Fragment />
      )}
      <span
        onClick={() => {
          if (props.toggled === true) {
            props.toggle();
          }
          setNavigation("/utilisateur");
          props.history.push("/utilisateur/panier");
        }}
        className="mobile-user-link"
      >
        <span className="nav-user-mobile">
          <i className="fas fa-shopping-basket nav-user-mobile-icon"></i>
        </span>
      </span>
    </React.Fragment>
  );
};

export default withRouter(User);
