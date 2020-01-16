import React, { useState } from "react";
import NavLinksContext from "./navLinksContext";
const uuidv4 = require("uuid/v4");

const NavState = props => {
  const [navLinks, setNavLinks] = useState([
    { id: uuidv4(), text: "Accueil", path: "/" },
    { id: uuidv4(), text: "Galerie", path: "/" },
    { id: uuidv4(), text: "Créez votre stylo", path: "/creez-votre-stylo" },
    { id: uuidv4(), text: "Contact", path: "/" }
  ]);
  const [color, setColor] = useState(null);


  return (
    <NavLinksContext.Provider
      value={{
        navLinks: navLinks,
        color: [color, setColor]
      }}
    >
      {props.children}
    </NavLinksContext.Provider>
  );
};

export default NavState;
