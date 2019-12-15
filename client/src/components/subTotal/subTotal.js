import React, { useContext } from "react";

const subTotal = () => {
  //const [subT, setSubT] = useContext(SubTotalContext);
  const formatter = new Intl.NumberFormat('fr-CA', {
        style: 'currency',
        currency: 'CAD',
        minimumFractionDigits: 2
      });

    return(
        <React.Fragment>
            <span className="sub-total">{/*formatter.format(subT)*/ 0}</span>
        </React.Fragment>
    );
};

export default subTotal;

