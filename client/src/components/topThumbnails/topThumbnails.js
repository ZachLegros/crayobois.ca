import React, { useContext } from "react";
import CvsContext from "../context/cvsContext";
import "./topThumbnails.css";

function TopThumbnails(props) {
  const context = useContext(CvsContext);
  const [filteringName, setFilteringName] = context.filteringName;
  const [hawsFilteringName, setHawsFilteringName] = context.hawsFilteringName;
  const [cvsDropDownToggle, setCvsDropDownToggle] = context.cvsDropDownToggle;
  const [activeCvsPage, setActiveCvsPage] = context.activeCvsPage;
  console.log(activeCvsPage)
  function toggleDropDown() {
    const width = document.documentElement.clientWidth;
    if (width <= 825) {
      setCvsDropDownToggle(!cvsDropDownToggle);
    }
  }

  if (activeCvsPage === "materials") {
    return (
      <React.Fragment>
        <div className="cvs-header">
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
          <i className="fas fa-chevron-left back" onClick={() => {
          context.cvsNav("back");
        }}></i>
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
