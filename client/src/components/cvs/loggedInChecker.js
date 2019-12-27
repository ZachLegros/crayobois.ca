import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import CvsContext from "../context/cvsContext";
import AuthContext from "../context/authContext";
import Cvs from "./cvs";
import Spinner from "../spinner/spinner";
import Nav from "../nav/nav";

const LoggedInChecker = () => {
  const cvsContext = useContext(CvsContext);
  const [isLoggedIn, setIsLoggedIn] = cvsContext.isLoggedIn;
  const authContext = useContext(AuthContext);
  const [
    initializedFirebase,
    setInitializedFirebase
  ] = authContext.initializedFirebase;

  useEffect(() => {
    authContext.isInitialized().then(val => {
      setInitializedFirebase(val);
    });
  }, []);

  if (initializedFirebase) {
    return <Cvs />;
  } else {
    return <Redirect to="/utilisateur" />;
  }
};

export default LoggedInChecker;
