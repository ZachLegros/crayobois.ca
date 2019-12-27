import React, { useContext, useState, useEffect } from "react";
import "./signIn.css";

const SignIn = () => {
  return (
    <section id="sign-in-sign-up">
      <div className="signin-container">
        <span className="login-text">Se connecter</span>
        <form>
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
            <span class="remember-me-txt">Se souvenir de moi</span>
          </label>
        </form>
        <span className="form-btn">Se connecter</span>
        <div className="form-or-container">
          <span className="form-or">ou</span>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
