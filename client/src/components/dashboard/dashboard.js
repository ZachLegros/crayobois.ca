import React, { useState, useContext, useEffect } from "react";
import "./dashboard.css";
import AuthContext from "../context/authContext";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;
  const [
    initializedFirebase,
    setInitializedFirebase
  ] = authContext.initializedFirebase;

  //test
  function signout() {
    authContext.signout();
    setInitializedFirebase(null);
  }

  useEffect(() => {}, []);

  return (
    <React.Fragment>
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
          console.log(user);
        }}
      >
        Show user
      </button>
      <span className="dashboard-username">{user.displayName}</span>
    </React.Fragment>
  );
};

export default Dashboard;
