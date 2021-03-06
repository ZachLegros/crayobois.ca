import React, { useState, useContext, useEffect } from "react";
import "./success.css";

const Success = props => {
  return (
    <section className="success-section">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.2 130.2"
      >
        <circle
          className="path circle"
          fill="none"
          stroke="#449c4f"
          strokeWidth="6"
          strokeMiterlimit="10"
          cx="65.1"
          cy="65.1"
          r="62.1"
        />
        <polyline
          className="path check"
          fill="none"
          stroke="#449c4f"
          strokeWidth="6"
          strokeLinecap="round"
          strokeMiterlimit="10"
          points="100.2,40.2 51.5,88.8 29.8,67.5 "
        />
      </svg>
      <span className="succes-text">
        Votre paiement a bien été reçu et votre commande sera traitée d'içi peu.
      </span>
    </section>
  );
};

export default Success;
