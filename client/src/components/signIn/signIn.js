import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authContext";

const SignIn = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
      const signinForm = document.querySelector("#signin-form");
      signinForm.addEventListener("submit", e => {
        e.preventDefault();
  
        // get user info
        const email = signinForm['signin-email'].value;
        const password = signinForm['signin-password'].value;
        
        authContext.signin(email, password);
      });
    }, []);

  return (
    <React.Fragment>
      <section id="sign-in-sign-up">
        <div className="sign-in-sign-up-container">
          <span className="header-text">Se connecter</span>
          <form id="signin-form">
            <div className="input-field">
              <input
                type="email"
                name="email"
                id="signin-email"
                placeholder="Adresse e-mail"
                autoComplete="off"
                required
              />
              <i className="fas fa-envelope input-icon"></i>
            </div>
            <div className="input-field">
              <input
                type="password"
                name="password"
                id="signin-password"
                placeholder="Mot de passe"
                autoComplete="off"
                required
              />
              <i className="fas fa-lock input-icon"></i>
            </div>
            <label className="remember-me">
              <input type="checkbox" name="check" id="remember-me-check" />
              <span className="remember-me-txt">Se souvenir de moi</span>
            </label>
          </form>
          <span className="form-btn">Se connecter</span>
          <div className="form-or-container">
            <span className="form-or">ou</span>
          </div>
          <span className="form-btn black">Créer un compte</span>
        </div>
      </section>
    </React.Fragment>
  );
};

export default SignIn;
