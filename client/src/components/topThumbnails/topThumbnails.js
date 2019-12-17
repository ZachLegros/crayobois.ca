import React, { useContext } from "react";
import CvsContext from "../context/cvsContext";
import CvsSearchBar from "../cvsSearchBar/cvsSearchBar";
import "./topThumbnails.css";

function TopThumbnails(props) {
  const context = useContext(CvsContext);
  const [filteringName, setFilteringName] = context.filteringName;

  return (
    <React.Fragment>
      <div className="cvs-header">
        <CvsSearchBar />
        <span className="cvs-state">{filteringName}</span>
      </div>
    </React.Fragment>
  );
}

export default TopThumbnails;
