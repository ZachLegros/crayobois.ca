import React, { useContext, useState, useEffect } from "react";
import "./landing.css";
import NavContext from "../context/navLinksContext";
import simpleParallax from "simple-parallax-js";
import bg from "./slideshow/img2.jpg";

const Landing = props => {
  const navContext = useContext(NavContext);
  const [color, setColor] = navContext.color;

  useEffect(() => {
    setColor(null);
  });

  return (
    <React.Fragment>
      <div id="landing-wrapper">
        <div id="landing-txt">
          <div className="landing-reveal">
            <h1>Crayobois</h1>
          </div>
          <div className="landing-reveal">
            <h2>Le stylo qu'il vous faut!</h2>
          </div>
          <a className="btn" href="/creez-votre-stylo">
            Créez le vôtre
            <i className="fas fa-long-arrow-alt-right" aria-hidden="true" />
          </a>
        </div>
        <img src={bg} className="landing-image" alt="landing image" />
      </div>
    </React.Fragment>
  );
};

export default Landing;
