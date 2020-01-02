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
      setDashboardAlertOn(false);

      if (actionForm["dashboard-alert-input"].value === "") {
        console.log("non");
      } else {
        if (alert.action === "ChangeEmail") {
          const value = actionForm["dashboard-alert-input"].value.trim();
          authContext.changeEmail(value);
        } else if (alert.action === "ChangeName") {
          const value = actionForm["dashboard-alert-input"].value.trim();
          authContext.changeName(value);
        } else if (alert.action === "ChangePassword") {
          const value = actionForm["dashboard-alert-input"].value;
          authContext.changePassword(value);
        }
      }
      // get input and patch
    });
  }, []);

  return (
    <React.Fragment>
      <div className="dashboard-overlay"></div>

      <div className="dashboard-alert">
        <span className="dashboard-alert-msg">{alert.message}</span>
        <form id="dashboard-alert-form" className="dashboard-alert-form">
          {alert.action === "ChangeName" ? (
            <input
              type="text"
              name="nom"
              className="dashboard-alert-input"
              id="dashboard-alert-input"
              placeholder={alert.placeholder}
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
              placeholder={alert.placeholder}
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
              placeholder={alert.placeholder}
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
