import React, { useState, useEffect } from "react";
import ScrollReveal from "scrollreveal";
import "./about.css";

const About = () => {
  useEffect(() => {
    ScrollReveal().reveal(".cvs-features-header");
    ScrollReveal().reveal(".about-p");
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
            <p className="about-p about-p2">
              Fondée en 2019 par <b> Vincent Legros </b> et{" "}
              <b> Dominic Violette </b>, jeunes entrepreneurs québécois de{" "}
              <b>17 ans</b>, à la suite d’un simple projet scolaire, Crayobois
              est devenue une microentreprise qui se démarque par son
              authenticité, son originalité, sa jeunesse et par la qualité de
              ses produits.
            </p>
          </div>
        </div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/crayobois-fe722.appspot.com/o/images%2FDSC01677.jpg?alt=media&token=b473ab8e-e0f6-4ab2-b682-d10b3b69b0c8"
          className="about-img desktop-img"
        />
      </div>
    </section>
  );
};

export default About;
