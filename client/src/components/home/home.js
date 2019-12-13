import React, { useContext } from "react";
import Landing from "../landing/landing";
import Perks from "../perks/perks";
import { NavLinksContext } from "../navLinksContext";
const uuidv4 = require("uuid/v4");

function Home() {

    return (
      <React.Fragment>
        <Landing />
        <Perks />
      </React.Fragment>
    );
  };


export default Home;
