import React, { useContext } from "react";
import CvsContext from "../context/cvsContext";

function CvsSearchBar(props) {
  const context = useContext(CvsContext);

  return (
    <React.Fragment>
      <div className="cvs-search-box">
        <input
          className="cvs-search-bar"
          type="text"
          name=""
          placeholder="Chercher un bois..."
        ></input>
        <a className="cvs-search-btn">
          <i className="fas fa-search"></i>
        </a>
      </div>
    </React.Fragment>
  );
}

export default CvsSearchBar;
