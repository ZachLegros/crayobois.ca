import React, { useEffect, useState, useContext } from "react";
import "./cvs.css";
import Thumbnails from "../thumbnails/thumbnails";
import StateText from "../stateText/stateText";
import BuildState from "../buildState/buildState";

const Cvs = props => {
  const nav = document.getElementsByClassName("navbar");

  useEffect(() => {
    nav[0].style.backgroundColor = "var(--black)";
    }, []);

  return (
    <React.Fragment>
      <div className="app-wrapper">
        <section>
          <div className="materials-wrapper">
            <div className="materials">
              <Thumbnails mats={props.mats}/>
            </div>
          </div>
          <StateText />
        </section>
        <BuildState />
      </div>
    </React.Fragment>
  );
};

const arePropsEqual = (prevProps, nextProps) => {
  return (nextProps != prevProps);
};

export default React.memo(Cvs, arePropsEqual);
