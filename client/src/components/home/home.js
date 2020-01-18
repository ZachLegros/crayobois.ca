import React, { useEffect } from "react";
import Landing from "../landing/landing";
import CvsLanding from "../cvsLanding/cvsLanding";

function Home(props) {
  useEffect(() => {
    props.onEnter();
  });

    return (
      <React.Fragment>
        <Landing />
        <CvsLanding />
      </React.Fragment>
    );
  };


export default Home;
