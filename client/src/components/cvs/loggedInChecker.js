import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import CvsContext from "../context/cvsContext";
import Cvs from "./cvs";

const LoggedInChecker = () => {
  const context = useContext(CvsContext);
  const [isLoggedIn, setIsLoggedIn] = context.isLoggedIn;
  return (
      isLoggedIn ? <Cvs /> : <Redirect to="/utilisateur" />
  );
};

export default LoggedInChecker;
