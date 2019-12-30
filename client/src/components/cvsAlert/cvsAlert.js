import React, { useContext } from "react";
import CvsContext from "../context/cvsContext";
import "./cvsAlert.css";
import AuthContext from "../context/authContext";

function CvsAlert(props) {
  const context = useContext(CvsContext);
  const [cvsAlertOn, setCvsAlertOn] = context.cvsAlertOn;
  const authContext = useContext(AuthContext);
  const myPen = context.myPen[0];

  return (
    <React.Fragment>
      <div className="cvs-alert">
        <span className="cvs-alert-msg">
          Désirez-vous ajouter ce stylo à votre panier?
        </span>
        <div className="cvs-alert-buttons">
          <span
            className="alert-button cvs-alert-cancel"
            onClick={() => {
              setCvsAlertOn(false);
            }}
          >
            Annuler
          </span>
          <span
            className="alert-button
           cvs-alert-yes"
            onClick={() => {
              authContext.userArrayUpdater("shoppingCart", myPen);
            }}
          >
            Oui
          </span>
        </div>
      </div>
      <div className="overlay"></div>
    </React.Fragment>
  );
}

export default CvsAlert;
