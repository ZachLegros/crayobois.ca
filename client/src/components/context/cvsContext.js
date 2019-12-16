import React, { useState, createContext } from "react";

export const CvsContext = createContext();

export const CvsProvider = props => {
  const [cvs, setCvs] = useState({
    cart: [],
    subTotal: 0,
    selectedComponents: [],
    type: "Exotique exceptionnel",
    buildStateTop: "Type de bois",
    materials: [],
    loading: true
  });

  return (
    <CvsContext.Provider value={[cvs, setCvs]}>
      {props.children}
    </CvsContext.Provider>
  );
};
