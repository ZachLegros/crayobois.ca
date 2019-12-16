import React, { useEffect, useState, useContext } from "react";
import "./cvs.css";
import Thumbnails from "../thumbnails/thumbnails";
import TopState from "../topState/TopState";
import BuildState from "../buildState/buildState";
import Spinner from "../spinner/spinner";
import CvsContext from "../context/cvsContext";

const Cvs = () => {
  const context = useContext(CvsContext);

  useEffect(() => {
    const nav = document.getElementsByClassName("navbar");
    nav[0].style.backgroundColor = "var(--black)";

    context.getMats();
  }, []);

  if (context.materials.length === 0) {
    return <Spinner />;
  } else {
    return (
      <div className="app-wrapper">
        <React.Fragment>
          <section>
            <div className="materials-wrapper">
              <div className="materials">
                <Thumbnails />
              </div>
            </div>
            <TopState />
          </section>
          <BuildState />
        </React.Fragment>
      </div>
    );
  }
};

export default Cvs;
