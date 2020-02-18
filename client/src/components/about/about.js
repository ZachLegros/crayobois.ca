import React, { useState, useEffect } from "react";
import img1 from "./images/DSC01607.jpg";
import img2 from "./images/DSC01677.jpg";
import "./about.css";
import ScrollReveal from "scrollreveal";

const About = () => {
  useEffect(() => {
    ScrollReveal().reveal(".cvs-features-header");
    ScrollReveal().reveal(".about-p");
    ScrollReveal().reveal(".about-img");
  }, []);
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-txt-container">
            <span className="cvs-features-header">
              Qui sommes-nous?
              <i className="fas fa-store-alt cvs-features-header-icon"></i>
            </span>
            <p className="about-p">
              Crayobois est une microentreprise de menuiserie spécialisée dans
              la fabrication de stylos en bois divers de haute qualité.
            </p>
            <p className="about-p">
              Fondée en 2019 par <b className="bold"> Vincent Legros </b> et{" "}
              <b className="bold"> Dominic Violette </b>, jeunes entrepreneurs
              québécois de <b>17 ans</b>, à la suite d’un simple projet
              scolaire, Crayobois est devenue une microentreprise qui se
              démarque par son authenticité, son originalité, sa jeunesse et par
              la qualité de ses produits.
            </p>
          </div>
        </div>
        <img src={img2} className="about-img" />
      </div>
    </section>
  );
};

export default About;
