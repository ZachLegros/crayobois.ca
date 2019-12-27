import React, { useContext, useState, useEffect } from "react";
import "./signUpAndSignIn.css";
import Nav from "../nav/nav";
import SignIn from "../signIn/signIn";
import SignUp from "../signUp/signUp";


const SignUpAndSignIn = () => {
  useEffect(() => {
    const nav = document.getElementsByClassName("navbar");
    nav[0].style.backgroundColor = "var(--black)";
  });

  return (
    <React.Fragment>
      <Nav />
      <SignIn />
    </React.Fragment>
  );
};

export default SignUpAndSignIn;
