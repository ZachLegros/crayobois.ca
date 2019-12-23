import React, { useEffect, useContext } from "react";
import "./cvs.css";
import Thumbnails from "../thumbnails/thumbnails";
import TopThumbnails from "../topThumbnails/topThumbnails";
import BuildState from "../buildState/buildState";
import Spinner from "../spinner/spinner";
import CvsContext from "../context/cvsContext";
import CvsDropDown from "../cvsDropDown/cvsDropDown";
import Nav from "../nav/nav";

const Cvs = () => {
  const context = useContext(CvsContext);
  const loading = context.loading;
  const [cvsDropDownToggle, setCvsDropDownToggle] = context.cvsDropDownToggle;
  const active = context.activeCvsPage[0];


  useEffect(() => {
    const nav = document.getElementsByClassName("navbar");
    nav[0].style.backgroundColor = "var(--black)";

    context.getMats();
    context.getHaws();
  }, []);

  if (context.materials.length === 0) {
    return (
      <React.Fragment>
        <Nav />
        <Spinner />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Nav />

        <div className="app-wrapper">
          <section
            id="cvs-scrollable-section"
            className={
              cvsDropDownToggle === false
                ? "cvs-scrollable-section"
                : "cvs-scrollable-section unscrollable"
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
};

export default Cvs;
