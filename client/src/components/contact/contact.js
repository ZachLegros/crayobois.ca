import React, { useContext, useState, useEffect } from "react";
import "./contact.css";

const Contact = props => {
  useEffect(() => {
    props.onEnter();
  }, []);

  return (
    <React.Fragment>
      <section className="contact-section">
        <div className="contact-container">
          <span className="header-text">Contactez-nous</span>
          <form id="contact-form">
            <div className="contact-infos">
              <div className="input-field">
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  className="input contact-name"
                  placeholder="Nom complet"
                  autoComplete="off"
                  required
                />
                <div className="input-icon">
                  <i className="fas fa-id-badge"></i>
                </div>
              </div>
              <div className="input-field contact-fields">
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  className="input contact-email"
                  placeholder="Adresse e-mail"
                  autoComplete="off"
                  required
                />
                <i className="fas fa-envelope input-icon"></i>
              </div>
            </div>
            <div className="input-field">
              <input
                type="text"
                name="message"
                id="contact-message"
                className="input"
                placeholder="Message"
                autoComplete="off"
                required
              />
              <div className="input-icon">
                <i className="fas fa-comment"></i>
              </div>
            </div>
            <div className="action-container">
              <button id="signin-action" className="form-btn">
                Envoyer<i className="fas fa-paper-plane form-btn-icon"></i>
              </button>
            </div>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Contact;
