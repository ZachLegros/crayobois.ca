import React, { useContext } from "react";
import CvsContext from "../context/cvsContext";
import CvsSearchBar from "../cvsSearchBar/cvsSearchBar";
import "./topThumbnails.css";

function TopThumbnails(props) {
  const context = useContext(CvsContext);
  const [filteringName, setFilteringName] = context.filteringName;
  const filterName = context.filterName[0];
  const [cvsDropDownToggle, setCvsDropDownToggle] = context.cvsDropDownToggle;

  function toggleDropDown() {
    const width = document.documentElement.clientWidth;
    console.log(width);
    if (width <= 825) {
      setCvsDropDownToggle(!cvsDropDownToggle);
    }
  }

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
}

export default TopThumbnails;
