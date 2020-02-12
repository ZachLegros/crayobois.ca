import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authContext";
import Dashboard from "../dashboard/dashboard";
import Spinner from "../spinner/spinner";
import NavContext from "../context/navLinksContext";

const User = props => {
  const authContext = useContext(AuthContext);
  const navContext = useContext(NavContext);
  const [navigation, setNavigation] = navContext.navigation;

  const [
    initializedFirebase,
    setInitializedFirebase
  ] = authContext.initializedFirebase;
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = authContext.redirect;

  useEffect(() => {
    setNavigation("dashboard");
    document.querySelector(".navbar").classList.add("black-nav");
    authContext.isInitialized().then(val => {
      setInitializedFirebase(val);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <React.Fragment>
        <Spinner />
      </React.Fragment>
    );
  } else if (initializedFirebase) {
    if (redirect) {
      props.history.push(redirect);
      setRedirect(null);
      return null;
    } else {
      return (
        <React.Fragment>
          {props.content === "" ? (
            props.history.push("/utilisateur/profil")
          ) : (
            <Dashboard content={props.content} history={props.history} />
          )}
        </React.Fragment>
      );
    }
  } else {
    props.history.push("/utilisateur/connexion");
    return null;
  }
};

export default User;
