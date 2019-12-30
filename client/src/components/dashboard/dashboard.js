import React, { useState, useContext, useEffect } from "react";
import "./dashboard.css";
import AuthContext from "../context/authContext";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const [
    initializedFirebase,
    setInitializedFirebase
  ] = authContext.initializedFirebase;
  const [name, setName] = useState("");
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState("");

  // signout function
  function signout() {
    authContext.signout();
    setInitializedFirebase(null);
  }

  // get name of user
  const getUsername = () => {
    const uName = authContext.getUsername();
    setName(uName);
  };

  // get verification of email state
  const getVerification = () => {
    const verification = authContext.getVerification();
    setVerified(verification);
  };

  const getEmail = () => {
    const email = authContext.getEmail();
    setEmail(email);
  };

  useEffect(() => {
    getUsername();
    getVerification();
    getEmail();
  }, []);

  return (
    <React.Fragment>
      {/*Test*/}
      <section className="dashboard">
        <div className="dashboard-user">
          <div className="dashboard-hero">
            <i className="fas fa-user dashboard-user-icon"></i>
            <span className="dashboard-hero-username">{name}</span>
            <span className="dashboard-hero-email">{email}</span>
            <button
            onClick={() => {
              signout();
            }}
            className="dashboard-hero-logout"
          >
            Déconnexion<i class="fas fa-sign-out-alt form-btn-icon"></i>
          </button>
          </div>
          <div className="dashboard-nav-container">
            <ul className="dashboard-nav">
              <li className="dashboard-nav-link">
                <a>
                <div className="dashboard-nav-icon-container"> <i className="fas fa-address-card dashboard-nav-icon"></i></div>Mon
                  profil
                </a>
              </li>
              <li className="dashboard-nav-link">
                <a>
                <div className="dashboard-nav-icon-container"> <i className="fas fa-shopping-basket dashboard-nav-icon"></i></div>
                  Mon panier
                </a>
              </li>
              <li className="dashboard-nav-link">
                <a>
                <div className="dashboard-nav-icon-container"><i className="fas fa-dolly-flatbed dashboard-nav-icon"></i></div>Mes
                  commandes
                </a>
              </li>
              <li className="dashboard-nav-link">
                <a>
                 <div className="dashboard-nav-icon-container"><i className="fas fa-user-cog dashboard-nav-icon"></i></div>
                  Paramètres
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="dashboard-content">
          <span>content</span>
          {verified ? (
            <span>Email verified</span>
          ) : (
            <span>Email not verified</span>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Dashboard;
