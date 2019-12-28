import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authContext";
import Nav from "../nav/nav";
import SignIn from "./signIn";
import SignUp from "./signUp";
import Dashboard from "../dashboard/dashboard";
import Spinner from "../spinner/spinner";

const User = () => {
  const authContext = useContext(AuthContext);
  const [signInOrUp, setSignInOrUp] = authContext.signInOrUp;
  const [
    initializedFirebase,
    setInitializedFirebase
  ] = authContext.initializedFirebase;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // nav color
    const nav = document.getElementsByClassName("navbar");
    nav[0].style.backgroundColor = "var(--black)";

    authContext.isInitialized().then(val => {
      setInitializedFirebase(val);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
        <React.Fragment>
        <Nav />
        <Spinner />
      </React.Fragment>
    ) 
  } else if (initializedFirebase) {
    return (
      <React.Fragment>
        <Nav />
        <Dashboard />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Nav />
        {signInOrUp === "in" ? <SignIn /> : <SignUp />}
      </React.Fragment>
    );
  }
};

export default User;