import React, { useContext, useState, useEffect } from "react";
import CvsContext from "../context/cvsContext";
import AuthContext from "../context/authContext";
import Nav from "../nav/nav";
import SignIn from "./signIn";
import SignUp from "./signUp";

const User = () => {
  const context = useContext(CvsContext);
  const isLoggedIn = context.isLoggedIn[0];
  const authContext = useContext(AuthContext);
  const [signInOrUp, setSignInOrUp] = authContext.signInOrUp;

  //test
  function signout() {
    authContext.signout();
  }

  function test() {
    console.log(isLoggedIn);
  }

  useEffect(() => {
    // nav color
    const nav = document.getElementsByClassName("navbar");
    nav[0].style.backgroundColor = "var(--black)";
  }, []);

  if (isLoggedIn === true) {
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
        <button
          className="test"
          onClick={() => {
            test();
          }}
        >
          test
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
