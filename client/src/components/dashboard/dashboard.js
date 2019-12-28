import React, { useState, useContext, useEffect } from "react";
import "./dashboard.css";
import AuthContext from "../context/authContext";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const [
    initializedFirebase,
    setInitializedFirebase
  ] = authContext.initializedFirebase;
  const [name, setName] = useState("");
  const [verified, setVerified] = useState(false);
  //test
  function signout() {
    authContext.signout();
    setInitializedFirebase(null);
  }

  const getUsername = () => {
    const uName = authContext.getUsername();
    setName(uName);
  };

  const getVerification = () => {
      const verification = authContext.getVerification();
      setVerified(verification);
  }

  useEffect(() => {
    getUsername();
    getVerification();
  }, []);

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
      <span className="dashboard-username">{name}</span>
      {verified ? <span>Email verified</span> : <span>Email not verified</span>}
    </React.Fragment>
  );
};

export default Dashboard;
