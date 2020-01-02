import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import "./dashboardAlert.css";

const DashboardAlert = props => {
  const authContext = useContext(AuthContext);
  const alert = authContext.alert;
  const [dashboardAlertOn, setDashboardAlertOn] = authContext.dashboardAlertOn;

  useEffect(() => {
    const actionForm = document.querySelector("#dashboard-alert-form");
    actionForm.addEventListener("submit", e => {
      e.preventDefault();

      if (
        actionForm["dashboard-alert-input"].value === "" ||
        actionForm["dashboard-alert-input"].value.length <= 3
      ) {
        //error handler here
        console.log("non");
      } else {
        if (alert.action === "ChangeEmail") {
          setDashboardAlertOn(false);
          const value = actionForm["dashboard-alert-input"].value.trim();
          authContext.changeEmail(value);
        } else if (alert.action === "ChangeName") {
          setDashboardAlertOn(false);
          const value = actionForm["dashboard-alert-input"].value.trim();
          authContext.changeName(value);
        } else if (alert.action === "ChangePassword") {
          setDashboardAlertOn(false);
          const value = actionForm["dashboard-alert-input"].value;
          authContext.changePassword(value);
        }
      }
      // get input and patch
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
            <input
              type="text"
              name="nom"
              className="dashboard-alert-input"
              id="dashboard-alert-input"
              autoComplete="off"
              placeholder={alert.placeholder}
              required
            />
          ) : (
            <React.Fragment></React.Fragment>
          )}
          {alert.action === "ChangeEmail" ? (
            <input
              type="email"
              name="email"
              className="dashboard-alert-input"
              id="dashboard-alert-input"
              autoComplete="off"
              placeholder={alert.placeholder}
              required
            />
          ) : (
            <React.Fragment></React.Fragment>
          )}
          {alert.action === "ChangePassword" ? (
            <input
              type="password"
              name="password"
              id="dashboard-alert-input"
              className="dashboard-alert-input"
              autoComplete="off"
              placeholder={alert.placeholder}
              required
            />
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
