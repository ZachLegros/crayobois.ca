import React, { useContext, useState, useEffect } from "react";
import "./landing.css";
import bg from "./slideshow/img2.jpg";
import { withRouter } from "react-router-dom";
import Context from "../context/navLinksContext";

const Landing = props => {
  const context = useContext(Context);
  const [navigation, setNavigation] = context.navigation;

  const parallax = () => {
    const image = document.querySelector(".landing-image");
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    const rate = scrolled * 0.35;

    image.style.transform = `translate3d(0, ${rate}px, 0)`;
  };

  useEffect(() => {
    setNavigation("/");
    document.querySelector(".navbar").classList.remove("black-nav");
    window.addEventListener("scroll", parallax);
    window.scrollTo(0, 1);
    return () => {
      window.removeEventListener("scroll", parallax);
    };
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
          <span
            className="btn main-btn"
            onClick={() => {
              props.history.push("creez-votre-stylo");
            }}
          >
            Créez le vôtre
            <i className="fas fa-long-arrow-alt-right" aria-hidden="true" />
          </span>
        </div>
        <img src={bg} className="landing-image" />
      </div>
    </React.Fragment>
  );
};

export default withRouter(Landing);
