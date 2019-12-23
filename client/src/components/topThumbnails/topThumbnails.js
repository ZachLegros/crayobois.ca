import React, { useContext } from "react";
import CvsContext from "../context/cvsContext";
import CvsSearchBar from "../cvsSearchBar/cvsSearchBar";
import "./topThumbnails.css";

function TopThumbnails(props) {
  const context = useContext(CvsContext);
  const [filteringName, setFilteringName] = context.filteringName;
  const [hawsFilteringName, setHawsFilteringName] = context.hawsFilteringName;
  const [cvsDropDownToggle, setCvsDropDownToggle] = context.cvsDropDownToggle;
  const [activeCvsPage, setActiveCvsPage] = context.activeCvsPage;

  function toggleDropDown() {
    const width = document.documentElement.clientWidth;
    console.log(width);
    if (width <= 825) {
      setCvsDropDownToggle(!cvsDropDownToggle);
    }
  }

  if (activeCvsPage === "materials") {
    return (
      <React.Fragment>
        <div className="cvs-header">
          <CvsSearchBar />
          <span
            className="cvs-state"
            onClick={() => {
              toggleDropDown();
            }}
          >
            {filteringName}
            <i className="fas fa-sort" id="sort"></i>
          </span>
        </div>
      </React.Fragment>
    );
  } else if (activeCvsPage === "hardwares") {
    return (
      <React.Fragment>
        <div className="cvs-header">
          <CvsSearchBar />
          <span
            className="cvs-state"
            onClick={() => {
              toggleDropDown();
            }}
          >
            {hawsFilteringName}
            <i className="fas fa-sort" id="sort"></i>
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default TopThumbnails;
