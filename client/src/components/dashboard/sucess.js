import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import "./profile.css";

const Success = props => {
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    const loader = document.getElementById("circle-loader");
    loader.classList.add("load-complete");

    setSuccessMsg(true);
  }, []);

  return (
    <section className="success-section">
      <div className="circle-loader" id="circle-loader">
        <div className="checkmark draw"></div>
      </div>
      {successMsg ? (
        <span className="succes-text">
          Votre paiement a bien été reçu et votre commande sera traitée d'içi peu.
          Merci d'avoir magasiné chez Crayobois!
        </span>
      ) : (
        <React.Fragment />
      )}
    </section>
  );
};

export default Success;
