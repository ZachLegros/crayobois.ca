import React, { useContext } from "react";
import CvsContext from "../context/cvsContext";

const CvsNav = (props) => {
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
        onClick={() => {
          context.cvsNav("back", null);
        }}
      >
        Précédent
      </a>

      <a
        className={
          cvsPage === "materials" ? 
          myPen[0][0].obj !== null
            ? "cvs-btn cvs-next active"
            : "cvs-btn cvs-next"
          :
          myPen[0][1].obj !== null
            ? "cvs-btn cvs-next active"
            : "cvs-btn cvs-next"
        }
        onClick={() => {
          context.cvsNav("next", null);
        }}
      >
        Suivant
      </a>
    </div>
  );
}

export default CvsNav;
