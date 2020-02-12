import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authContext";
import Nav from "../nav/nav";
import "./signUpAndSignIn.css";
import Spinner from "../spinner/spinner";

const SignUp = props => {
  const authContext = useContext(AuthContext);
  const [caughtErr, setCaughtErr] = authContext.caughtErr;
  const [errorMsg, setErrorMsg] = authContext.errorMsg;
  const [
    initializedFirebase,
    setInitializedFirebase
  ] = authContext.initializedFirebase;

  useEffect(() => {
    const nav = document.querySelector(".navbar");
    nav.classList.add("black-nav")

    const signupForm = document.querySelector("#signup-form");
    const actionBtn = document.querySelector("#signup-action");
    signupForm.addEventListener("submit", e => {
      e.preventDefault();
      actionBtn.classList.add("btn-loading");

      // get user info
      const name = signupForm["signup-name"].value.trim();
      const email = signupForm["signup-email"].value.trim();
      const password = signupForm["signup-password"].value;

      setTimeout(() => {
        if (password.length >= 6) {
          //sign up the user
          authContext.signup(name, email, password);
        }
      }, 1250);
    });
  }, []);


  return (
    <React.Fragment>
      {initializedFirebase ? props.history.push("/utilisateur/profil") : <React.Fragment />}
      <section id="sign-in-sign-up">
        <div className="sign-in-sign-up-container">
          <span className="header-text">Créer un compte</span>
          <form id="signup-form">
            {caughtErr ? (
              <div className="error-container">
                <span className="error-message">
                  <i className="fas fa-info-circle"></i>
                  {errorMsg}
                </span>
              </div>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            <div className="input-field">
              <input
                type="text"
                name="name"
                id="signup-name"
                className="input"
                placeholder="Nom complet"
                autoComplete="off"
                required
              />
              <div className="input-icon">
                <i className="fas fa-id-badge"></i>
              </div>
            </div>
            <div className="input-field">
              <input
                type="email"
                name="email"
                id="signup-email"
                className="input"
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
                className="input"
                placeholder="Mot de passe"
                autoComplete="off"
                required
              />
              <i className="fas fa-lock input-icon"></i>
            </div>
            <div className="action-container">
              <button id="signup-action" className="form-btn">
                Créer un compte
                <i className="fas fa-user-plus form-btn-icon"></i>
              </button>
            </div>
          </form>
          <div className="form-or-container">
            <span className="form-or">ou</span>
          </div>
          <button
            className="form-btn black"
            onClick={() => {
              props.history.push("/utilisateur/connexion");
              setErrorMsg("");
              setCaughtErr(false);
            }}
          >
            Se connecter<i className="fas fa-sign-in-alt form-btn-icon"></i>
          </button>
        </div>
      </section>
    </React.Fragment>
  );
};

export default SignUp;
