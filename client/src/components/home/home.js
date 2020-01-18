import React, { useContext } from "react";
import Landing from "../landing/landing";
import AuthContext from "../context/authContext";
import CvsLanding from "../cvsLanding/cvsLanding";

function Home() {
  const authContext = useContext(AuthContext);

    return (
      <React.Fragment>
        <Landing />
        <CvsLanding />
      </React.Fragment>
    );
  };


export default Home;
