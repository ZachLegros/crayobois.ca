import React, { useState, useContext, useEffect } from "react";
import "./dashboard.css";
import AuthContext from "../context/authContext";
import Profile from "./profile";
import Cart from "./cart";
import Orders from "./orders";
import DashboardAlert from "./dashboardAlert";

const Dashboard = props => {
  const authContext = useContext(AuthContext);
  const [
    initializedFirebase,
    setInitializedFirebase
  ] = authContext.initializedFirebase;
  const [user, setUser] = authContext.user;
  const [verified, setVerified] = useState(false);
  const [userNav, setUserNav] = useState("profile");
  const [dashboardAlertOn, setDashboardAlertOn] = authContext.dashboardAlertOn;

  // signout function
  function signout() {
    authContext.signout();
    setInitializedFirebase(null);
  }

  // get verification of email state
  const getVerification = () => {
    const verification = authContext.getVerification();
    setVerified(verification);
  };

  useEffect(() => {
    getVerification();
    authContext.getUserSession();
  }, []);

  return (
    <React.Fragment>
      {dashboardAlertOn === true ? <DashboardAlert /> : <React.Fragment />}
      <section className="dashboard">
        <div className="dashboard-user">
          <div className="dashboard-hero">
            <i className="fas fa-user dashboard-user-icon"></i>
            <span className="dashboard-hero-username">{user.fullName}</span>
            <span className="dashboard-hero-email">{user.email}</span>
            <button
              onClick={() => {
                signout();
              }}
              className="dashboard-hero-logout-btn"
            >
              Déconnexion<i className="fas fa-sign-out-alt form-btn-icon"></i>
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
                  setUserNav("cart");
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
            </ul>
            <ul className="dashboard-mobile-dropdown-toggler">
              <li className="dashboard-mobile-current">
                {userNav === "profile" ? (
                  // get selected link
                  <li
                    className="dashboard-mobile-nav-link"
                    onClick={() => {
                      setUserNav("profile");
                    }}
                  >
                    <a>
                      <div className="dashboard-nav-icon-container">
                        <i className="fas fa-address-card dashboard-nav-icon"></i>
                      </div>
                      Mon profil
                      <i className="fas fa-chevron-down userDropdownToggleIcon"></i>
                    </a>
                  </li>
                ) : // get selected link
                userNav === "cart" ? (
                  <li
                    className="dashboard-mobile-nav-link"
                    onClick={() => {
                      setUserNav("cart");
                    }}
                  >
                    <a>
                      <div className="dashboard-nav-icon-container">
                        <i className="fas fa-shopping-basket dashboard-nav-icon"></i>
                      </div>
                      Mon panier
                      <i className="fas fa-chevron-down userDropdownToggleIcon"></i>
                    </a>
                  </li>
                ) : (
                  // get selected link
                  <li
                    className="dashboard-mobile-nav-link"
                    onClick={() => {
                      setUserNav("orders");
                    }}
                  >
                    <a>
                      <div className="dashboard-nav-icon-container">
                        <i className="fas fa-dolly-flatbed dashboard-nav-icon"></i>
                      </div>
                      Mes commandes
                      <i className="fas fa-chevron-down userDropdownToggleIcon"></i>
                    </a>
                  </li>
                )}
              </li>
              {/*Dropdown*/}
              <li className="dashboard-mobile-dropdown">
                <ul className="dashboard-mobile-nav">
                  {userNav !== "profile" ? (
                    <li
                      className="dashboard-mobile-nav-link"
                      onClick={() => {
                        setUserNav("profile");
                      }}
                    >
                      <a>
                        <div className="dashboard-nav-icon-container">
                          <i className="fas fa-address-card dashboard-nav-icon"></i>
                        </div>
                        Mon profil
                      </a>
                    </li>
                  ) : (
                    <React.Fragment />
                  )}
                  {userNav !== "cart" ? (
                    <li
                      className="dashboard-mobile-nav-link"
                      onClick={() => {
                        setUserNav("cart");
                      }}
                    >
                      <a>
                        <div className="dashboard-nav-icon-container">
                          <i className="fas fa-shopping-basket dashboard-nav-icon"></i>
                        </div>
                        Mon panier
                      </a>
                    </li>
                  ) : (
                    <React.Fragment />
                  )}
                  {userNav !== "orders" ? (
                    <li
                      className="dashboard-mobile-nav-link"
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
                  ) : (
                    <React.Fragment />
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="dashboard-content">
          {/*Render profile*/}
          {userNav === "profile" ? <Profile /> : <React.Fragment />}
          {/*Render cart*/}
          {userNav === "cart" ? <Cart /> : <React.Fragment />}
          {/*Render orders*/}
          {userNav === "orders" ? <Orders /> : <React.Fragment />}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Dashboard;
