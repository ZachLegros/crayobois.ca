import React, { useContext, useState, useEffect } from "react";
import "./contact.css";
import img from "./img/img1.jpg";
import Context from "../context/navLinksContext";

const Contact = props => {
  const context = useContext(Context);
  const [navigation, setNavigation] = context.navigation;

  useEffect(() => {
    setNavigation("contact");
  });

  return (
    <React.Fragment>
      <section className="contact-section">
        <div className="contact-container">
          <img src={img} className="contact-image" />
          <div className="contact-content">
            <span className="contact-header-text">Contactez-nous</span>
            <span className="contact-sub-header">
              Renseignements généraux
              <i className="fas fa-question-circle contact-sub-header-icon"></i>
            </span>
            <span className="contact-text">
              Pour toutes questions concernant les stylos, les prix ou la
              livraison, n'hésitez pas à nous contacter via e-mail.
            </span>
            <a href="mailto:dv.crayobois@gmail.com" className="contact-btn">
              Poser une question
              <i className="fas fa-question-circle contact-sub-header-icon contact-btn-icon"></i>
            </a>
            <div className="technical-issues">
              <span className="contact-sub-header">
                Problèmes techniques
                <i className="fas fa-cogs contact-sub-header-icon"></i>
              </span>
              <span className="contact-text">
                Pour tous problèmes techniques, S.V.P contactez notre webmestre
                afin de reporter ceux-ci.
              </span>
              <a
                href="mailto:legroszach3921@gmail.com"
                className="contact-btn bottom-btn"
              >
                Reporter un problème
                <i className="fas fa-cogs contact-sub-header-icon contact-btn-icon"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Contact;
