import React, { useContext } from "react";
import Landing from "../landing/landing";
import Perks from "../perks/perks";
import AuthContext from "../context/authContext";

function Home() {
  const authContext = useContext(AuthContext);

    return (
      <React.Fragment>
        <Landing />
        <Perks />
      </React.Fragment>
    );
  };


export default Home;
