import React, { useState, useContext, useEffect } from "react";
import "./userIcon.css";
import AuthContext from "../context/authContext";
import { withRouter } from "react-router-dom";

const User = props => {
  const authContext = useContext(AuthContext);
  const [auth, setAuth] = useState(null);

  authContext.isInitialized().then(authState => {
    setAuth(authState);
  });


  return (
    <React.Fragment>
      <span
        onClick={() => {
          props.history.push("/utilisateur/profil");
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
          onClick={() => {props.history.push("/utilisateur/panier")}}
          className="nav-user-links"
        >
          panier<i className="fas fa-shopping-basket nav-user-icons"></i>
        </span>
      ) : (
        <React.Fragment />
      )}
      <span
        onClick={() => {props.history.push("/utilisateur/panier")}}
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
