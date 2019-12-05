import React from "react";
import "./cvs.css";
import Thumbnails from "../thumbnails/thumbnails";
import StateText from "../stateText/stateText";
import BuildState from "../buildState/buildState";

function Cvs() {

    window.addEventListener("load", loadEventHandler);
  
    function loadEventHandler() {
      navColorCvs();
    }
  
    function navColorCvs() {
      const nav = document.getElementsByClassName("navbar");

      nav[0].style.backgroundColor = "var(--black)";
    }

  return (
    <React.Fragment>
      <div className="app-wrapper">
        <section className="materials-section">
          <div className="materials-wrapper">
            <div className="materials">
              <Thumbnails />
            </div>
          </div>
          <StateText />
        </section>
        <BuildState />
      </div>
    </React.Fragment>
  );
}

export default Cvs;
