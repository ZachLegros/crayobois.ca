import React, { useContext } from "react";
import { SubTotalContext } from "../subTotalContext";

const subTotal = () => {
  const [subT, setSubT] = useContext(SubTotalContext);
  const formatter = new Intl.NumberFormat('fr-CA', {
        style: 'currency',
        currency: 'CAD',
        minimumFractionDigits: 2
      });

    return(
        <React.Fragment>
            <span className="sub-total">{formatter.format(subT)}</span>
        </React.Fragment>
    );
};

export default subTotal;

