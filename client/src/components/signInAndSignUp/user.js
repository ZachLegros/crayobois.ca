import React, { useContext, useState, useEffect } from "react";
import CvsContext from "../context/cvsContext";
import AuthContext from "../context/authContext";
import Nav from "../nav/nav";
import SignIn from "./signIn";
import SignUp from "./signUp";
import Spinner from "../spinner/spinner";
import { Redirect } from "react-router-dom";

const User = () => {
  const context = useContext(CvsContext);
  const [isLoggedIn, setIsLoggedIn] = context.isLoggedIn;
  const authContext = useContext(AuthContext);
  const [signInOrUp, setSignInOrUp] = authContext.signInOrUp;
  const [
    initializedFirebase,
    setInitializedFirebase
  ] = authContext.initializedFirebase;

  //test
  function signout() {
    authContext.signout();
    setInitializedFirebase(null);
  }

  useEffect(() => {
    // nav color
    const nav = document.getElementsByClassName("navbar");
    nav[0].style.backgroundColor = "var(--black)";

    authContext.isInitialized().then(val => {
      setInitializedFirebase(val);
    });
  }, [initializedFirebase]);

  if (initializedFirebase) {
      return (
        <React.Fragment>
          <Nav />
          {/*Test*/}
          <button
            className="test"
            onClick={() => {
              signout();
            }}
          >
            Sign out
          </button>
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
