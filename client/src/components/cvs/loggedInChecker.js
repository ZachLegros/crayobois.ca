import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import CvsContext from "../context/cvsContext";
import AuthContext from "../context/authContext";
import Cvs from "./cvs";
import Spinner from "../spinner/spinner";

const LoggedInChecker = props => {
  const authContext = useContext(AuthContext);
  const [initializedFirebase, setInitializedFirebase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authContext.isInitialized().then(val => {
      setInitializedFirebase(val);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Spinner />
  }
   else if (initializedFirebase) {
    return <Cvs />;
  } else {
    props.history.push("/utilisateur");
    return null;
  }
};

export default LoggedInChecker;
