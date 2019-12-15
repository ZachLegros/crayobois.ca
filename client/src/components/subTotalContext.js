import React, { useState, createContext } from "react";

export const SubTotalContext = createContext();

export const SubTotalProvider = props => {
    const [subT, setSubT] = useState(0)

  return (
    <SubTotalContext.Provider value={[subT, setSubT]}>
      {props.children}
    </SubTotalContext.Provider>
  );
};
