import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authContext";
import "./signUpAndSignIn.css";

const SignIn = props => {
  const authContext = useContext(AuthContext);
  const [caughtErr, setCaughtErr] = authContext.caughtErr;
  const [errorMsg, setErrorMsg] = authContext.errorMsg;
  const [
    initializedFirebase,
    setInitializedFirebase
  ] = authContext.initializedFirebase;

  useEffect(() => {
    const nav = document.querySelector(".navbar");
    nav.style.backgroundColor = "var(--black)";

    const signinForm = document.querySelector("#signin-form");
    const actionBtn = document.querySelector("#signin-action");
    signinForm.addEventListener("submit", e => {
      e.preventDefault();
      actionBtn.classList.add("btn-loading");

      // get user info
      const email = signinForm["signin-email"].value;
      const password = signinForm["signin-password"].value;

      setTimeout(() => {
        authContext.signin(email, password);
      }, 500);
    });
  }, []);

  

  return (
    <React.Fragment>
      {initializedFirebase ? props.history.push("/utilisateur/profil") : <React.Fragment />}
      <section id="sign-in-sign-up">
        <div className="sign-in-sign-up-container">
          <span className="header-text">Se connecter</span>
          <form id="signin-form">
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
                type="email"
                name="email"
                id="signin-email"
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
                className="input"
                id="signin-password"
                placeholder="Mot de passe"
                autoComplete="off"
                required
              />
              <i className="fas fa-lock input-icon"></i>
            </div>
            <a
              href="/utilisateur/nouveau-mot-de-passe"
              className="signin-forgot-password-container"
            >
              <span className="signin-forgot-password">
                Vous avez oublié votre mot de passe?
              </span>
            </a>
            <div className="action-container">
              <button id="signin-action" className="form-btn">
                Se connecter<i className="fas fa-sign-in-alt form-btn-icon"></i>
              </button>
            </div>
          </form>
          <div className="form-or-container">
            <span className="form-or">ou</span>
          </div>
          <button
            className="form-btn black"
            onClick={() => {
              props.history.push("/utilisateur/creer-un-compte");
              setErrorMsg("");
              setCaughtErr(false);
            }}
          >
            Créer un compte<i className="fas fa-user-plus form-btn-icon"></i>
          </button>
        </div>
      </section>
    </React.Fragment>
  );
};

export default SignIn;
