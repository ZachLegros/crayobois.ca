import React from "react";
import "./cvs.css";
import Thumnails from "../thumbnails/thumbnails";
import StateText from "../stateText/stateText";
import BuildState from "../buildState/buildState";

function Cvs(props) {
  return (
    <React.Fragment>
      <div id="app-wrapper">
        <section className="materials-section">
          <div className="materials-wrapper">
            <Thumnails />
          </div>
          <StateText />
        </section>
        <BuildState />
      </div>
    </React.Fragment>
  );
}

export default Cvs;
