import React, { useState } from "react";
import NavLinksContext from "./navLinksContext";
const uuidv4 = require("uuid/v4");

const NavState = props => {
  const [navigation, setNavigation] = useState("home");


  return (
    <NavLinksContext.Provider
      value={{
        navigation: [navigation, setNavigation]
      }}
    >
      {props.children}
    </NavLinksContext.Provider>
  );
};

export default NavState;
