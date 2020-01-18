import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import "./profile.css";

const Profile = props => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;
  const nameMsg = "Entrez votre nouveau nom d'utilisateur ci-dessous:";
  const passMsg =
    "Une autorisation de changement de mot de passe sera envoyée à l'adresse suivante:";

  return (
    <React.Fragment>
      <span className="dashboard-content-header">Mon profil</span>
      <div className="profile-content">
        <div className="profile-attribute-text">
          <div className="profile-attribute">
            <span className="profile-attribute-name">Nom d'utilisateur</span>
            <span className="profile-attribute-state fullName">
              {user.fullName}
              <i
                className="fas fa-edit"
                onClick={() => {
                  authContext.alertParams(
                    nameMsg,
                    "ChangeName",
                    "Nom d'utilisateur"
                  );
                }}
              ></i>
            </span>
          </div>
          <div className="profile-attribute">
            <span className="profile-attribute-name">Adresse e-mail</span>
            <span className="profile-attribute-state-uneditable">
              {user.email}
            </span>
          </div>
        </div>

        <div className="profile-attribute">
          <span
            className="profile-change-password"
            onClick={() => {
              authContext.alertParams(
                passMsg,
                "ChangePassword",
                "Mot de passe"
              );
            }}
          >
            Changer mon mot de passe<i className="fas fa-key form-btn-icon"></i>
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
