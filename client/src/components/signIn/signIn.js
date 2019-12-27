import React, { useContext, useState, useEffect } from "react";
import "./signIn.css";

const SignIn = () => {
  return (
    <section id="sign-in-sign-up">
      <div className="signin-container">
        <span className="login-text">Se connecter</span>
        <div className="should-signup">
          <span>vous êtes nouveau chez crayobois ? </span>
           <a><span className="orange">inscrivez-vous</span></a>
        </div>
        <form id="signin-form">
          <div className="input-field">
            <input
              type="email"
              id="signin-email"
              onkeyup="this.setAttribute('value', this.value);"
              value=""
              required
            />
            <label htmlFor="signin-email" class="label-email">
                <span className="content-email">Adresse e-mail</span>
            </label>
          </div>
        
        </form>
      </div>
    </section>
  );
};

export default SignIn;
