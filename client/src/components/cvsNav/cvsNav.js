import React, { useContext, useEffect } from "react";
import CvsContext from "../context/cvsContext";

function CvsNav(props) {
  const context = useContext(CvsContext);
  const myPen = context.myPen;
  const cvsPage = context.cvsPage;

  return (
    <div className="cvs-nav-container">
      <a className={cvsPage[0] !== "materials"
        ? "cvs-btn cvs-back active"
        : "cvs-btn cvs-back"}>Précédent</a>

      <a className={myPen[0][0].obj !== null
                            ? "cvs-btn cvs-next active"
                            : "cvs-btn cvs-next"}>Suivant</a>
    </div>
  );
}

export default CvsNav;
