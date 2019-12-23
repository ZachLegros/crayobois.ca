import React, { useContext, useEffect } from "react";
import CvsContext from "../context/cvsContext";

function CvsNav(props) {
  const context = useContext(CvsContext);
  const myPen = context.myPen;
  const cvsPage = context.activeCvsPage[0];

  return (
    <div className="cvs-nav-container">
      <a
        className={
          cvsPage !== "materials"
            ? "cvs-btn cvs-back active"
            : "cvs-btn cvs-back"
        }
        onClick={() => context.cvsNav()}
      >
        Précédent
      </a>

      <a
        className={
          myPen[0][0].obj !== null
            ? "cvs-btn cvs-next active"
            : "cvs-btn cvs-next"
        }
        onClick={() => context.cvsNav()}
      >
        Suivant
      </a>
    </div>
  );
}

export default CvsNav;
