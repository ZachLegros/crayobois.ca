import React, { useContext } from "react";
import Landing from "../landing/landing";
import Perks from "../perks/perks";
import Nav from "../nav/nav";

function Home() {

    return (
      <React.Fragment>
        <Nav />
        <Landing />
        <Perks />
      </React.Fragment>
    );
  };


export default Home;
