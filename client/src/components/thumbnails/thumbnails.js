import React, { useEffect, useState, useContext } from "react";
import CvsContext from "../context/cvsContext";
import Spinner from "../spinner/spinner";
import "./thumbnails.css";
import ScrollReveal from "scrollreveal";
const { uuid } = require('uuidv4');

function Thumbnails(props) {
  const context = useContext(CvsContext);
  const [prevToggleId, setPrevToggleId] = context.prevToggleId;
  const displayed = context.displayedHaw[0];
  const [prevToggleHaw, setPrevToggleHaw] = context.prevToggleHaw;

  const formatter = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });

  function toggleMatsHeart(id, type) {
    var isOnPage = false;
    function checkIfOnPage() {
      //check if the mats are filtered and if the previous selected item is on the page
      if (context.filteredMats.length !== 0) {
        for (var i = 0; i < context.filteredMats.length; i++) {
          if (context.filteredMats[i]._id === prevToggleId) {
            isOnPage = true;
          }
        }
      } else {
        isOnPage = true;
      }
    }
    checkIfOnPage();
    //same thumbnail
    if (prevToggleId === id) {
      document.getElementById(id).classList.remove("fa-heart");
      document.getElementById(id).classList.add("fa-plus");
      setPrevToggleId(0);
      //if no other thumbnail is selected
      //if another thumbnail is selected in another page
    } else if (prevToggleId === 0 || isOnPage === false) {
      document.getElementById(id).classList.add("fa-heart");
      document.getElementById(id).classList.remove("fa-plus");
      setPrevToggleId(id);
    }
    //if another thumbnail is selected in the page
    else {
      document.getElementById(prevToggleId).classList.remove("fa-heart");
      document.getElementById(prevToggleId).classList.add("fa-plus");
      document.getElementById(id).classList.add("fa-heart");
      document.getElementById(id).classList.remove("fa-plus");
      setPrevToggleId(id);
    }
  }

  function toggleHawsHeart() {
    if (prevToggleHaw === {}) {
      setPrevToggleHaw(displayed);
    } else if (prevToggleHaw === displayed) {
      setPrevToggleHaw({});
    } else {
      setPrevToggleHaw(displayed);
    }
  }

  useEffect(() => {
  }, []);

  if (context.activeCvsPage[0] === "materials") {
    if (context.filteredMats.length === 0) {
      return (
        <React.Fragment>
          {context.materials.map(material => {
            return (
              <div className="material-thumbnail" key={material._id}>
                <div className="thumbnail-img-container">
                  <img
                    src={material.path}
                    className="material-img"
                    onClick={() => {
                      context.addToPen(material._id, 0);
                      toggleMatsHeart(material._id);
                    }}
                    alt=""
                  />
                </div>
                <div className="material-thumbnail-content">
                  <div className="material-thumbnail-content-top">
                    <span className="material-origin">
                      <i className="fas fa-globe-americas" />
                      {material.origin}
                    </span>
                    <a
                      onClick={() => {
                        context.addToPen(material._id, 0);
                        toggleMatsHeart(material._id);
                      }}
                    >
                      <i
                        id={material._id}
                        className={
                          prevToggleId === material._id
                            ? "fas fa-heart"
                            : "fas fa-plus"
                        }
                      ></i>
                    </a>
                  </div>
                  <div className="material-thumbnail-content-mid">
                    <span className="material-name">
                      {material.name}
                      <a
                        className="thumbnail-img-link"
                        href={material.path}
                        target="blank"
                      >
                        <i className="fas fa-search-plus"></i>
                      </a>
                    </span>
                  </div>
                  <div className="material-thumbnail-content-bottom">
                    <span className="material-price">
                      {formatter.format(material.price)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {context.filteredMats.map(material => {
            return (
              <div className="material-thumbnail" key={material._id}>
                <div className="thumbnail-img-container">
                  <img
                    src={material.path}
                    className="material-img"
                    onClick={() => {
                      context.addToPen(material._id, 0);
                      toggleMatsHeart(material._id);
                    }}
                    alt=""
                  />
                </div>
                <div className="material-thumbnail-content">
                  <div className="material-thumbnail-content-top">
                    <span className="material-origin">
                      <i className="fas fa-globe-americas" />
                      {material.origin}
                    </span>
                    <a
                      onClick={() => {
                        context.addToPen(material._id, 0);
                        toggleMatsHeart(material._id);
                      }}
                    >
                      <i
                        id={material._id}
                        className={
                          prevToggleId === material._id
                            ? "fas fa-heart"
                            : "fas fa-plus"
                        }
                      ></i>
                    </a>
                  </div>
                  <div className="material-thumbnail-content-mid">
                    <span className="material-name">
                      {material.name}
                      <a
                        className="thumbnail-img-link"
                        href={material.path}
                        loading="lazy"
                        target="blank"
                      >
                        <i className="fas fa-search-plus"></i>
                      </a>
                    </span>
                  </div>
                  <div className="material-thumbnail-content-bottom">
                    <span className="material-price">
                      {formatter.format(material.price)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </React.Fragment>
      );
    }
  } else if (context.activeCvsPage[0] === "hardwares") {
    const imgStyle = {
      backgroundImage: "url(" + displayed.path + ")"
    };
    return (
      <React.Fragment>
        <div className="hardware-thumbnail">
          <div className="hardware-thumbnail-top">
            <div className="haws-icon-container">
              <i className="fas fa-palette"></i>
              <span className="hardware-color">{displayed.color}</span>
            </div>
            <a>
              <i className={prevToggleHaw === displayed ? "fas fa-heart" : "fas fa-plus"} onClick={() => {
                context.addToPen(displayed, 1);
                toggleHawsHeart();
              }}></i>
            </a>
          </div>
          <div className="hardware-thumbnail-mid">
            <div className="hardware-thumbnail-mid-nav">
              <i className="fas fa-chevron-left haws-nav-arrow" onClick={() => {
                context.newDisplayedHaw("prev")}}></i>
              <div
                className="hardware-thumbnail-mid-img"
                style={imgStyle}
              ></div>
              <i className="fas fa-chevron-right haws-nav-arrow" onClick={() => {context.newDisplayedHaw("next")}}></i>
            </div>
          </div>
          <div className="hardware-thumbnail-bottom">
            <span className="hardware-thumbnail-mid-notice">
              *Le matériau démontré est la loupe d’érable
            </span>
            <span className="hardware-price">
              {formatter.format(displayed.price)}
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Thumbnails;
