import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authContext";
import Nav from "../nav/nav";
import SignIn from "./signIn";
import SignUp from "./signUp";
import Dashboard from "../dashboard/dashboard";
import Spinner from "../spinner/spinner";
import { useHistory } from "react-router-dom";

const User = props => {
  const authContext = useContext(AuthContext);
  const [
    initializedFirebase,
    setInitializedFirebase
  ] = authContext.initializedFirebase;
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = authContext.redirect;
  const [userNav, setUserNav] = authContext.userNav;
  let history = useHistory();

  useEffect(() => {
    props.onEnter();
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
      history.push(redirect);
      setRedirect(null);
      return null;
    } else {
      return (
        <React.Fragment>
          {props.content === "" ? 
          props.history.push("/utilisateur/profil")
          :
          <Dashboard content={props.content} history={props.history}/>
        }
        </React.Fragment>
      );
    }
  } else {
    props.history.push("/utilisateur/connexion");
    return(null);
  }
};

export default User;
