import React, { useState, useContext, useEffect } from "react";
import "./dashboard.css";
import AuthContext from "../context/authContext";
import Profile from "./profile";
import Cart from "./cart";
import Orders from "./orders";
import Settings from "./settings";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const [
    initializedFirebase,
    setInitializedFirebase
  ] = authContext.initializedFirebase;
  const [name, setName] = useState("");
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [userNav, setUserNav] = useState("profile");

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
              className="dashboard-hero-logout-btn"
            >
              Déconnexion<i class="fas fa-sign-out-alt form-btn-icon"></i>
            </button>
          </div>
          <div className="dashboard-nav-container">
            <ul className="dashboard-nav">
              <li
                className="dashboard-nav-link"
                onClick={() => {
                  setUserNav("profile");
                }}
              >
                <a>
                  <div className="dashboard-nav-icon-container">
                    {" "}
                    <i className="fas fa-address-card dashboard-nav-icon"></i>
                  </div>
                  Mon profil
                </a>
              </li>
              <li
                className="dashboard-nav-link"
                onClick={() => {
                  setUserNav("bag");
                }}
              >
                <a>
                  <div className="dashboard-nav-icon-container">
                    {" "}
                    <i className="fas fa-shopping-basket dashboard-nav-icon"></i>
                  </div>
                  Mon panier
                </a>
              </li>
              <li
                className="dashboard-nav-link"
                onClick={() => {
                  setUserNav("orders");
                }}
              >
                <a>
                  <div className="dashboard-nav-icon-container">
                    <i className="fas fa-dolly-flatbed dashboard-nav-icon"></i>
                  </div>
                  Mes commandes
                </a>
              </li>
              <li
                className="dashboard-nav-link"
                onClick={() => {
                  setUserNav("settings");
                }}
              >
                <a>
                  <div className="dashboard-nav-icon-container">
                    <i className="fas fa-user-cog dashboard-nav-icon"></i>
                  </div>
                  Paramètres
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="dashboard-content">
          {/*Render profile*/}
          {userNav === "profile" ? <Profile /> : <React.Fragment />}
          {/*Render cart*/}
          {userNav === "profile" ? <Cart /> : <React.Fragment />}
          {/*Render profile*/}
          {userNav === "profile" ? <Orders /> : <React.Fragment />}
          {/*Render profile*/}
          {userNav === "profile" ? <Settings /> : <React.Fragment />}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Dashboard;
