import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authContext";
import Nav from "../nav/nav";
import SignIn from "./signIn";
import SignUp from "./signUp";
import Dashboard from "../dashboard/dashboard";
import Spinner from "../spinner/spinner";
import { useHistory } from "react-router-dom";
import NavContext from "../context/navLinksContext";

const User = () => {
  const navContext = useContext(NavContext);
  const [color, setColor] = navContext.color;
  const authContext = useContext(AuthContext);
  const [signInOrUp, setSignInOrUp] = authContext.signInOrUp;
  const [
    initializedFirebase,
    setInitializedFirebase
  ] = authContext.initializedFirebase;
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = authContext.redirect;
  let history = useHistory();

  useEffect(() => {
    setColor("var(--black)");
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
          <Dashboard />
        </React.Fragment>
      );
    }
  } else {
    return (
      <React.Fragment>
        {signInOrUp === "in" ? <SignIn /> : <SignUp />}
      </React.Fragment>
    );
  }
};

export default User;
