import React, { useEffect, useState, useContext } from "react";
import "./cvs.css";
import Thumbnails from "../thumbnails/thumbnails";
import TopThumbnails from "../topThumbnails/topThumbnails";
import BuildState from "../buildState/buildState";
import Spinner from "../spinner/spinner";
import CvsContext from "../context/cvsContext";
import CvsDropDown from "../cvsDropDown/cvsDropDown";
import CvsAlert from "../cvsAlert/cvsAlert";
import NavContext from "../context/navLinksContext";

const Cvs = React.memo(props => {
  const context = useContext(CvsContext);
  const navContext = useContext(NavContext);
  const loading = context.loading;
  const [cvsDropDownToggle, setCvsDropDownToggle] = context.cvsDropDownToggle;
  const active = context.activeCvsPage[0];
  const [cvsAlertOn, setCvsAlertOn] = context.cvsAlertOn;
  const [color, setColor] = navContext.color;

  useEffect(() => {
    setColor("var(--black)");
    context.getMats();
    context.getHaws();
  }, []);

  if (context.materials.length === 0) {
    return (
      <React.Fragment>
        <Spinner />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        {cvsAlertOn ? <CvsAlert /> : <React.Fragment />}
        <div className="app-wrapper">
          <section
            id="cvs-scrollable-section"
            className={
              cvsDropDownToggle === true
                ? "cvs-scrollable-section unscrollable"
                : "cvs-scrollable-section"
            }
          >
            <TopThumbnails />
            <CvsDropDown />
            <div className={active + "-wrapper"}>
              {loading === true ? (
                <Spinner />
              ) : (
                <div className={active}>
                  <Thumbnails />
                </div>
              )}
            </div>
          </section>
          <BuildState />
        </div>
      </React.Fragment>
    );
  }
});

export default Cvs;
