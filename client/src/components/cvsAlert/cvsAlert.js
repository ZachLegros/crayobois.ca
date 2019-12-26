import React, { useContext } from "react";
import CvsContext from "../context/cvsContext";
import "./cvsAlert.css";

function CvsAlert(props) {
  const context = useContext(CvsContext);
  const [cvsAlertOn, setCvsAlertOn] = context.cvsAlertOn;

  return (
    <React.Fragment>
      <div className="cvs-alert">
        <span className="cvs-alert-msg">
          Désirez-vous ajouter ce stylo à votre panier?
        </span>
        <div className="cvs-alert-buttons">
          <span className="cvs-alert-cancel" onClick={() => {
              setCvsAlertOn(false);
          }}>Annuler</span>
          <span className="cvs-alert-yes">Oui</span>
        </div>
      </div>
      <div className="overlay"></div>
    </React.Fragment>
  );
}

export default CvsAlert;
