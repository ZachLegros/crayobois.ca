import React, { useContext } from "react";
import CvsContext from "../context/cvsContext";
import "./topThumbnails.css";
import SubTotal from "../subTotal/subTotal";
import CvsNav from "../cvsNav/cvsNav";

const TopThumbnails = props => {
  const context = useContext(CvsContext);
  const [filteringName, setFilteringName] = context.filteringName;
  const [hawsFilteringName, setHawsFilteringName] = context.hawsFilteringName;
  const [cvsDropDownToggle, setCvsDropDownToggle] = context.cvsDropDownToggle;
  const [activeCvsPage, setActiveCvsPage] = context.activeCvsPage;

  const toggleDropDown = () => {
    const width = document.documentElement.clientWidth;
    if (width <= 825) {
      setCvsDropDownToggle(!cvsDropDownToggle);
    }
  };

  return (
    <React.Fragment>
      <div className="cvs-header">
        <div className="cvs-header-row">
          <span
            className="cvs-state"
            onClick={() => {
              toggleDropDown();
            }}
          >
            {context.activeCvsPage[0] === "hardwares"
              ? context.hawsFilteringName
              : filteringName}
            <i className="fas fa-sort" id="sort"></i>
          </span>
          <div className="mobile-cvs-header">
            <SubTotal />
          </div>
        </div>
        <div className="cvs-header-row mobile">
          <React.Fragment>
            <CvsNav />
          </React.Fragment>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TopThumbnails;
