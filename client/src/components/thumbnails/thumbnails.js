import React, { useEffect, useState, useContext } from "react";
import CvsContext from "../context/cvsContext";
import Spinner from "../spinner/spinner";
import "./thumbnails.css";

function Thumbnails(props) {
  const context = useContext(CvsContext);
  const [prevToggleId, setPrevToggleId] = context.prevToggleId;
  const displayed = context.displayedHaw[0];

  const formatter = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });

  function toggleHeart(id) {
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
    console.log(isOnPage);
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

  useEffect(() => {}, []);

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
                      toggleHeart(material._id);
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
                        toggleHeart(material._id);
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
                      toggleHeart(material._id);
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
                        toggleHeart(material._id);
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
    return (
      <React.Fragment>
        <span className="cvs-step-title">Sélection du style</span>
        <div className="hardware-thumbnail">
          <div className="hardware-thumbnail-top">
            <div>
              <i className="fas fa-palette"></i>
              <span className="hardware-color">{displayed.color}</span>
            </div>
            <div>
              <i className="fas fa-plus"></i>
            </div>
          </div>
          <div className="hardware-thumbnail-mid">
            <div className="hardware-thumbnail-mid-nav">
              <div className="hardware-thumbnail-mid-nav-arrows">
                <i className="fas fa-chevron-up"></i>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="hardware-thumbnail-mid-img-container">
                <img src={displayed.path} className="hardware-img"></img>
              </div>
            </div>
            <span className="hardware-thumbnail-mid-notice">
              *Le matériau démontré est la loupe d’érable
            </span>
          </div>
          <div className="hardware-thumbnail-bottom">
            <span>{formatter.format(displayed.price)}</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Thumbnails;
