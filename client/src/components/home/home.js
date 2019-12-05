import React, { useContext } from "react";
import Landing from "../landing/landing";
import Perks from "../perks/perks";
import { NavLinksContext } from "../navLinksContext";
const uuidv4 = require("uuid/v4");

function Home() {
  const [navLinks, setNavLinks] = useContext(NavLinksContext);

  function updateLinks() {
      console.log("yo");
    setNavLinks(prevLinks => {
      const links = [...prevLinks];
      const about = {
        id: uuidv4(),
        text: "À propos",
        path: "/"
      };
      const cvs = {
        id: uuidv4(),
        text: "Créez votre stylo",
        path: "/creez-votre-stylo"
      };
      links[0] = about;
      links.splice(2, 1, cvs);
    });
  };


    return (
      <React.Fragment>
        <Landing />
        <Perks />
      </React.Fragment>
    );
  };


export default Home;
