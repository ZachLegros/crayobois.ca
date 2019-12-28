import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authContext";
import Nav from "../nav/nav";
import "./signUpAndSignIn.css";

const SignIn = () => {
  const authContext = useContext(AuthContext);
  const [signInOrUp, setSignInOrUp] = authContext.signInOrUp;

  function toggleSignUp() {
    setSignInOrUp("up");
  }

  useEffect(() => {
    //nav color
    const nav = document.getElementsByClassName("navbar");
    nav[0].style.backgroundColor = "var(--black)";

    const signinForm = document.querySelector("#signin-form");
    signinForm.addEventListener("submit", e => {
      e.preventDefault();

      // get user info
      const email = signinForm["signin-email"].value;
      const password = signinForm["signin-password"].value;

      authContext.signin(email, password);
    });
  }, []);

  return (
    <React.Fragment>
      <Nav />
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
            <button className="form-btn">Se connecter</button>
          </form>
          <div className="form-or-container">
            <span className="form-or">ou</span>
          </div>
          <button
            className="form-btn black"
            onClick={() => {
              toggleSignUp();
            }}
          >
            Créer un compte
          </button>
        </div>
      </section>
    </React.Fragment>
  );
};

export default SignIn;
