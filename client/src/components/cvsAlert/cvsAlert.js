import React, { useContext, useState, useEffect } from "react";
import CvsContext from "../context/cvsContext";
import "./cvsAlert.css";
import AuthContext from "../context/authContext";

function CvsAlert(props) {
  const context = useContext(CvsContext);
  const setCvsAlertOn = context.cvsAlertOn[1];
  const authContext = useContext(AuthContext);
  const [myPen, setMyPen] = context.myPen;
  const setPrevToggleId = context.prevToggleId[1];
  const setPrevToggleHaw = context.prevToggleHaw[1];
  const setMaterialPrice = context.materialPrice[1];
  const setHardwarePrice = context.hardwarePrice[1];
  const setFilteringName = context.filteringName[1];
  const setHawsFilteringName = context.hawsFilteringName[1];
  const setFilteredHaws = context.filteredHaws[1];
  const setFilteredMats = context.filteredMats[1];
  const [filterName, setFilterName] = context.filterName;
  const [msg, setMsg] = useState("");
  const [buttonMsg, setBtnMsg] = useState("");

  useEffect(() => {
    if (authContext.isAuth[0]) {
      setMsg("Désirez-vous ajouter ce stylo à votre panier?");
      setBtnMsg("Oui");
    } else {
      setMsg("Pour ajouter un stylo à votre panier, vous devez d'abord vous connecter ou vous inscrire.");
      setBtnMsg("Se connecter");
    }
  }, []);

  return (
    <React.Fragment>
      <div className="cvs-alert">
        <span className="cvs-alert-msg">
          {msg}
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
              if (authContext.isAuth[0]) {
                // update shopping cart
                authContext.AddToCart(myPen, "Stylo personnalisé");
                // state initialization
                setCvsAlertOn(false);
                context.cvsNav("", "materials");
                setPrevToggleId(0);
                setMaterialPrice(0);
                setPrevToggleHaw(0);
                setHardwarePrice(0);
                setFilteringName("Tous les matériaux");
                setFilteredMats([]);
                setFilteredHaws([]);
                setHawsFilteringName("Tous les matériels")
                setMyPen([
                  { obj: null, id: 0 },
                  { obj: null, id: 1 }
                ]);
              } else {
                props.history.push("/utilisateur/connexion");
              }
              
            }}
          >
            {buttonMsg}
          </span>
        </div>
      </div>
      <div className="overlay"></div>
    </React.Fragment>
  );
}

export default CvsAlert;
