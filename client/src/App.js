import React, { useState } from "react";
import Nav from "./components/nav/nav";
import Home from "./components/home/home";
import Cvs from "./components/cvs/cvs";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {NavLinksProvider} from "./components/navLinksContext";
const uuidv4 = require("uuid/v4");

function App() {
  
  

  /*const homeNav = () => {
    const about = { 
      id: uuidv4(), 
      text: "À propos", 
      path: "/" };
    const cvs = {
      id: uuidv4(),
      text: "Créez votre stylo",
      path: "/creez-votre-stylo"
    };

    navLinks[0] = about;
    navLinks.splice(2, 1, cvs);
    console.log(navLinks);
  };

  const cvsNav = () => {
    const home = { 
      id: uuidv4(), 
      text: "Accueil", 
      path: "/" };

    navLinks[0] = home;
    navLinks.splice(2, 1);
    console.log(navLinks);
  }*/

  return (
    <NavLinksProvider>
      <React.Fragment>
        <Nav />
        <Router>
          <Route path="/" exact render={props => <Home {...props} /*links={homeNav} *//>} />
          <Route path="/creez-votre-stylo" exact render={props => <Cvs {...props} /*links={cvsNav}*/ />} />
        </Router> 
      </React.Fragment>
    </NavLinksProvider>
  );
}

export default App;
