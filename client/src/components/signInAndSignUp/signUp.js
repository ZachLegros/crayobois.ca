import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authContext";
import Nav from "../nav/nav";
import "./signUpAndSignIn.css";

const SignUp = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    // nav color
    const nav = document.getElementsByClassName("navbar");
    nav[0].style.backgroundColor = "var(--black)";

    const signupForm = document.querySelector("#signup-form");
    signupForm.addEventListener("submit", e => {
      e.preventDefault();

      // get user info
      const email = signupForm["signup-email"].value;
      const password = signupForm["signup-password"].value;
      const password2 = signupForm["signup-confirm-password"].value;

      if (password === password2 && password.length >= 6) {
        //sign up the user
        authContext.signup(email, password);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <Nav />
      <section id="sign-in-sign-up">
        <div className="sign-in-sign-up-container">
          <span className="header-text">Créer un compte</span>
          <form id="signup-form">
            <div className="input-field">
              <input
                type="email"
                name="email"
                id="signup-email"
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
                id="signup-password"
                placeholder="Mot de passe"
                autoComplete="off"
                required
              />
              <i className="fas fa-lock input-icon"></i>
            </div>
            <div className="input-field">
              <input
                type="password"
                name="confirm-password"
                id="signup-confirm-password"
                placeholder="Confirmer le mot de passe"
                autoComplete="off"
                required
              />
              <i className="fas fa-lock input-icon"></i>
            </div>
            <button className="form-btn">Créer un compte</button>
          </form>
          <div className="form-or-container">
            <span className="form-or">ou</span>
          </div>
          <button className="form-btn black">Se connecter</button>
        </div>
      </section>
    </React.Fragment>
  );
};

export default SignUp;
