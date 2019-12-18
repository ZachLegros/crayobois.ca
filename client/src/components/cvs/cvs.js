import React, { useEffect, useContext } from "react";
import "./cvs.css";
import Thumbnails from "../thumbnails/thumbnails";
import TopThumbnails from "../topThumbnails/topThumbnails";
import BuildState from "../buildState/buildState";
import Spinner from "../spinner/spinner";
import CvsContext from "../context/cvsContext";
import CvsDropDown from "../cvsDropDown/cvsDropDown";

const Cvs = () => {
  const context = useContext(CvsContext);
  const loading = context.loading;
  const [cvsDropDownToggle, setCvsDropDownToggle] = context.cvsDropDownToggle;

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
          <section id="cvs-scrollable-section" className={cvsDropDownToggle === false ? "cvs-scrollable-section" : "cvs-scrollable-section unscrollable"
          }>
            <TopThumbnails />
            <CvsDropDown />
            <div className="materials-wrapper">
              {loading === true ? (
                <Spinner />
              ) : (
                <div className="materials">
                  <Thumbnails />
                </div>
              )}
            </div>
          </section>
          <BuildState />
        </React.Fragment>
      </div>
    );
  }
};

export default Cvs;
