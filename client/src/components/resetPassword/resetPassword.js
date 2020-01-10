import React, { useState, useContext, useEffect } from "react";
import "./resetPassword.css";
import Nav from "../nav/nav";
import AuthContext from "../context/authContext";

const ResetPassword = props => {
  const authContext = useContext(AuthContext);
  const emailSent = authContext.emailSent[0];
  const [caughtErr, setCaughtErr] = authContext.caughtErr;
  const [errorMsg, setErrorMsg] = authContext.errorMsg;

  useEffect(() => {
    //nav color
    const nav = document.getElementsByClassName("navbar");
    nav[0].style.backgroundColor = "var(--black)";

    const resetForm = document.querySelector("#reset-password-form");
    const actionBtn = document.querySelector("#forgot-password-action");
    resetForm.addEventListener("submit", e => {
      e.preventDefault();
      actionBtn.classList.add("btn-loading");

      // get user info
      const email = resetForm["reset-password-email"].value.trim();

      setTimeout(() => {
        //sign up the user
        authContext.resetPassword(email);
      }, 1250);
    });
  }, []);

  return (
    <React.Fragment>
      <Nav />
      {emailSent ? (props.history.push("/utilisateur")
      ) : (
        <section id="reset-password-section">
          <div className="reset-password-container">
            <span className="header-text">
              Quelle est votre adresse e-mail?
            </span>
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
            <span className="reset-password-notice">
              Veuillez vérifier votre adresse e-mail. Nous vous enverrons
              ensuite des instructions pour réinitialiser votre mot de passe.
            </span>
            <form id="reset-password-form">
              <div className="input-field reset-password-input">
                <input
                  type="email"
                  name="email"
                  id="reset-password-email"
                  className="input"
                  placeholder="Adresse e-mail"
                  autoComplete="off"
                  required
                />
                <i className="fas fa-envelope input-icon"></i>
              </div>
              <div className="action-container reset-password-action">
                <button className="form-btn" id="forgot-password-action">
                  Réinitialiser mon mot de passe<i className="fas fa-key form-btn-icon"></i>
                </button>
              </div>
            </form>
            <div className="form-or-container">
              <span className="form-or">ou</span>
            </div>
            <button
              className="form-btn black"
              onClick={() => {
                props.history.push("/utilisateur");
                setErrorMsg("");
                setCaughtErr(false);
              }}
            >
              Se connecter<i className="fas fa-sign-in-alt form-btn-icon"></i>
            </button>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default ResetPassword;
