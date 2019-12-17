import React, { useContext } from "react";
import CvsContext from "../context/cvsContext";

function SubTotal(props) {
  const context = useContext(CvsContext);
  var sTotal = context.materialPrice + context.hardwarePrice;

  //function to format price
  const formatter = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });

  return (
      <div className="sub-total-container"> 
        <span className="sub-total">Sous-total: </span>
        <span className="sub-total-value">{formatter.format(sTotal)}</span>
      </div>
  );
}

export default SubTotal;
