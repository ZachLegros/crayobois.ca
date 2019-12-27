import React, { useContext, useState, useEffect } from "react";
import "./loginAndRegister.css";
import Nav from "../nav/nav";

const LoginAndRegister = () => {
  useEffect(() => {
    const nav = document.getElementsByClassName("navbar");
    nav[0].style.backgroundColor = "var(--black)";
  });

  return (
    <React.Fragment>
      <Nav />
    </React.Fragment>
  );
};

export default LoginAndRegister;
