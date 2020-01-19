import React, { useState, useContext, useEffect } from "react";
import "./userIcon.css";
import AuthContext from "../context/authContext";

const User = () => {
  const authContext = useContext(AuthContext);
  const [auth, setAuth] = useState(null);

  authContext.isInitialized().then(authState => {
    setAuth(authState);
  });

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <a href="/utilisateur/profil" className="nav-user-links">
        {auth ? "mon compte" : "connexion"}
        {auth ? (
          <i className="fas fa-user nav-user-icons"></i>
        ) : (
          <i className="fas fa-sign-in-alt  nav-user-icons"></i>
        )}
      </a>
      {auth ? (
        <a href="/utilisateur/panier" className="nav-user-links">
          panier<i className="fas fa-shopping-basket nav-user-icons"></i>
        </a>
      ) : (
        <React.Fragment />
      )}
      <a href="/utilisateur/panier" className="mobile-user-link">
        <span className="nav-user-mobile">
          <i className="fas fa-shopping-basket nav-user-mobile-icon"></i>
        </span>
      </a>
    </React.Fragment>
  );
};

export default User;
