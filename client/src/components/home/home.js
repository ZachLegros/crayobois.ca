import React, { useEffect } from "react";
import Landing from "../landing/landing";
import CvsLanding from "../cvsLanding/cvsLanding";
import About from "../about/about";

function Home(props) {
  useEffect(() => {
    props.onEnter();
  });

    return (
      <React.Fragment>
        <Landing />
        <CvsLanding />
        <About />
      </React.Fragment>
    );
  };


export default Home;
