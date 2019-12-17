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
    <React.Fragment>
      <span className="sub-total">{formatter.format(sTotal)}</span>
    </React.Fragment>
  );
}

export default SubTotal;
