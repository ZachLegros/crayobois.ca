import React from "react";
import "./landing.css";

function Landing() {
  /*Parallax and navColor */

  window.addEventListener("scroll", scrollEventHandler);
  window.addEventListener("load", loadEventHandler);

  function loadEventHandler() {
    parallax();
  }

  function scrollEventHandler() {
    parallax();
  }

  function parallax() {
    const img = document.getElementById("landing-wrapper");
    const scrollValue = document.documentElement.scrollTop;
    const height = img.offsetHeight;
    const landing_block = document.getElementById("landing-txt");
    const btn = document.getElementsByClassName("btn");
    const opacity = 1 - scrollValue / (height / 2) + 0.25;

    if (scrollValue <= height) {
      img.style.backgroundPositionY = scrollValue - scrollValue * 0.6 + "px";
      landing_block.style.opacity = opacity;
      btn[0].style.opacity = opacity;
    }
  }
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
      </div>
    </React.Fragment>
  );
}

export default Landing;
