import React, { useContext } from "react";
import CvsContext from "../context/cvsContext";
import "./cvsAlert.css";
import AuthContext from "../context/authContext";

function CvsAlert(props) {
  const context = useContext(CvsContext);
  const [cvsAlertOn, setCvsAlertOn] = context.cvsAlertOn;
  const authContext = useContext(AuthContext);
  const [myPen, setMyPen] = context.myPen;
  const [prevToggleId, setPrevToggleId] = context.prevToggleId;
  const [prevToggleHaw, setPrevToggleHaw] = context.prevToggleHaw;
  const [materialPrice, setMaterialPrice] = context.materialPrice;
  const [hardwarePrice, setHardwarePrice] = context.hardwarePrice;
  const [filteringName, setFilteringName] = context.filteringName;
  const [hawsFilteringName, setHawsFilteringName] = context.hawsFilteringName;

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
              // update shopping cart
              authContext.AddToCart(myPen, "Stylo personnalisé");
              // state initialization
              setCvsAlertOn(false);
              context.cvsNav("", "materials");
              setPrevToggleId(0);
              setMaterialPrice(0);
              setPrevToggleHaw({});
              setHardwarePrice(0);
              setFilteringName("Tous les matériaux");
              setHawsFilteringName("");

              setMyPen([
                { obj: null, id: 0 },
                { obj: null, id: 1 }
              ]);
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
