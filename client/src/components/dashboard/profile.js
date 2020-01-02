import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import "./profile.css";

const Profile = props => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;

  const nameMsg = "Entrez votre nouveau nom d'utilisateur ci-dessous.";
  const emailMsg =
    "Entrez votre nouvelle adresse e-mail ci-dessous. Une demande de confirmation y sera envoyé par la suite.";
  const passMsg = "Entrez votre nouveau mot de passe ci-dessous";

  return (
    <React.Fragment>
      <span className="dashboard-content-header">Mon profil</span>
      <div className="profile-content">
        <div className="profile-attribute">
          <span className="profile-attribute-name">Nom d'utilisateur</span>
          <span className="profile-attribute-state">
            {user.fullName}
            <i
              className="fas fa-edit"
              onClick={() => {
                authContext.alertParams(nameMsg, "ChangeName", "Nom d'utilisateur");
              }}
            ></i>
          </span>
        </div>
        <div className="profile-attribute">
          <span className="profile-attribute-name">Adresse e-mail</span>
          <span className="profile-attribute-state">
            {user.email}
            <i
              className="fas fa-edit"
              onClick={() => {
                authContext.alertParams(emailMsg, "ChangeEmail", "Adresse e-mail");
              }}
            ></i>
          </span>
        </div>
        <div className="profile-attribute">
          <span
            className="profile-change-password"
            onClick={() => {
              authContext.alertParams(passMsg, "ChangePassword", "Mot de passe");
            }}
          >
            Changer mon mot de passe<i class="fas fa-key form-btn-icon"></i>
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
