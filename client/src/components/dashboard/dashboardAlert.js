import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import "./dashboardAlert.css";

const DashboardAlert = props => {
  const authContext = useContext(AuthContext);
  const alert = authContext.alert;
  const [dashboardAlertOn, setDashboardAlertOn] = authContext.dashboardAlertOn;
  const [user, setUser] = authContext.user;

  useEffect(() => {
    const actionForm = document.querySelector("#dashboard-alert-form");
    actionForm.addEventListener("submit", e => {
      e.preventDefault();
        //error handler here
        if (alert.action === "ChangeName") {
          // get input and patch
          setDashboardAlertOn(false);
          const value = actionForm["dashboard-alert-input"].value.trim();
          authContext.changeName(value);
        } else if (alert.action === "ChangePassword") {
          setDashboardAlertOn(false);
          authContext.changePassword();
        }
    });
  }, []);

  return (
    <React.Fragment>
      <div
        className="dashboard-overlay"
        onClick={() => {
          setDashboardAlertOn(false);
        }}
      ></div>
      <div className="dashboard-alert">
        <span className="dashboard-alert-msg">{alert.message}</span>
        <form id="dashboard-alert-form" className="dashboard-alert-form">
          {alert.action === "ChangeName" ? (
            <div className="input-field">
              <input
                type="text"
                name="name"
                id="dashboard-alert-input"
                className="input"
                placeholder={alert.placeholder}
                autoComplete="off"
                required
              />
              <div className="input-icon">
                <i className="fas fa-id-badge"></i>
              </div>
            </div>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          {alert.action === "ChangePassword" ? (
            <span className="reset-password-email">{user.email}</span>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          <div className="dashboard-alert-buttons">
            <button
              type="reset"
              className="dashboard-alert-cancel"
              onClick={() => {
                setDashboardAlertOn(false);
              }}
            >
              Annuler
            </button>
            <button
              type="submit"
              id="dashboard-alert-action-btn"
              className="dashboard-alert-action"
            >
              Confirmer
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default DashboardAlert;
