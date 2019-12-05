import React, { useState, createContext } from "react";
const uuidv4 = require("uuid/v4");

export const NavLinksContext = createContext();

export const NavLinksProvider = props => {
  const [navLinks, setNavLinks] = useState([
    { id: uuidv4(), text: "Accueil", path: "/" },
    { id: uuidv4(), text: "Galerie", path: "/" },
    { id: uuidv4(), text: "Créez votre stylo", path: "/creez-votre-stylo" },
    { id: uuidv4(), text: "Contact", path: "/" }
  ]);

  return (
    <NavLinksContext.Provider value={[navLinks, setNavLinks]}>
      {props.children}
    </NavLinksContext.Provider>
  );
};
