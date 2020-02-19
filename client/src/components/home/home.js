import React, { useEffect } from "react";
import Landing from "../landing/landing";
import CvsLanding from "../cvsLanding/cvsLanding";
import About from "../about/about";
import Footer from "../footer/footer";

function Home(props) {

    return (
      <React.Fragment>
        <Landing />
        <CvsLanding />
        <About />
        <Footer />
      </React.Fragment>
    );
  };


export default Home;
