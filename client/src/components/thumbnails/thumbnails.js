import React, { useEffect, useState, useContext } from "react";
import CvsContext from "../context/cvsContext";
import Spinner from "../spinner/spinner";
import "./thumbnails.css";
import ScrollReveal from "scrollreveal";
const { uuid } = require("uuidv4");

function Thumbnails(props) {
  const context = useContext(CvsContext);
  const [prevToggleId, setPrevToggleId] = context.prevToggleId;
  const [prevToggleHaw, setPrevToggleHaw] = context.prevToggleHaw;

  const formatter = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });

  function toggleMatsHeart(id) {
    let isOnPage = false;
    function checkIfOnPage() {
      //check if the mats are filtered and if the previous selected item is on the page
      if (context.filteredMats[0].length !== 0) {
        for (let i = 0; i < context.filteredMats[0].length; i++) {
          if (context.filteredMats[0][i]._id === prevToggleId) {
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

  function toggleHawsHeart(id) {
    let isOnPage = false;
    function checkIfOnPage() {
      //check if the mats are filtered and if the previous selected item is on the page
      if (context.filteredHaws[0].length !== 0) {
        for (let i = 0; i < context.filteredHaws[0].length; i++) {
          if (context.filteredHaws[0][i]._id === prevToggleHaw) {
            isOnPage = true;
          }
        }
      } else {
        isOnPage = true;
      }
    }
    checkIfOnPage();
    //same thumbnail
    if (prevToggleHaw === id) {
      document.getElementById(id).classList.remove("fa-heart");
      document.getElementById(id).classList.add("fa-plus");
      setPrevToggleHaw(0);
      //if no other thumbnail is selected
      //if another thumbnail is selected in another page
    } else if (prevToggleHaw === 0 || isOnPage === false) {
      document.getElementById(id).classList.add("fa-heart");
      document.getElementById(id).classList.remove("fa-plus");
      setPrevToggleHaw(id);
    }
    //if another thumbnail is selected in the page
    else {
      document.getElementById(prevToggleHaw).classList.remove("fa-heart");
      document.getElementById(prevToggleHaw).classList.add("fa-plus");
      document.getElementById(id).classList.add("fa-heart");
      document.getElementById(id).classList.remove("fa-plus");
      setPrevToggleHaw(id);
    }
  }

  useEffect(() => {}, []);

  if (context.activeCvsPage[0] === "materials") {
    if (context.filteredMats[0].length === 0) {
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
                  />
                </div>
                <div className="material-thumbnail-content">
                  <div className="material-thumbnail-content-top">
                    <span className="material-name">{material.name}</span>
                    <span
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
                    </span>
                  </div>
                  <div className="material-thumbnail-content-mid">
                    <span className="material-origin">
                      <i className="fas fa-globe-americas globe"></i>
                      {material.origin}
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
          {context.filteredMats[0].map(material => {
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
                    <span className="material-name">{material.name}</span>
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
                    <span className="material-origin">
                      <i className="fas fa-globe-americas globe" />
                      {material.origin}
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
    if (context.filteredHaws[0].length === 0) {
      return (
        <React.Fragment>
          {context.hardwares.map(hardware => {
            return (
              <div className="material-thumbnail" key={hardware._id}>
                <div className="thumbnail-img-container">
                  <img
                    src={hardware.path}
                    className="material-img"
                    onClick={() => {
                      context.addToPen(hardware, 1);
                      toggleHawsHeart(hardware._id);
                    }}
                  />
                </div>
                <div className="material-thumbnail-content">
                  <div className="material-thumbnail-content-top">
                    <span className="material-name">{hardware.type}</span>
                    <span
                      onClick={() => {
                        context.addToPen(hardware, 1);
                        toggleHawsHeart(hardware._id);
                      }}
                    >
                      <i
                        id={hardware._id}
                        className={
                          prevToggleHaw === hardware._id
                            ? "fas fa-heart"
                            : "fas fa-plus"
                        }
                      ></i>
                    </span>
                  </div>
                  <div className="material-thumbnail-content-mid">
                    <span className="material-origin">
                      <i className="fas fa-palette globe"></i>
                      {hardware.color}
                    </span>
                  </div>
                  <div className="material-thumbnail-content-bottom">
                    <span className="material-price">
                      {formatter.format(hardware.price)}
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
          {context.filteredHaws[0].map(hardware => {
            return (
              <div className="material-thumbnail" key={hardware._id}>
                <div className="thumbnail-img-container">
                  <img
                    src={hardware.path}
                    className="material-img"
                    onClick={() => {
                      context.addToPen(hardware, 1);
                      toggleHawsHeart(hardware._id);
                    }}
                  />
                </div>
                <div className="material-thumbnail-content">
                  <div className="material-thumbnail-content-top">
                    <span className="material-name">{hardware.type}</span>
                    <span
                      onClick={() => {
                        context.addToPen(hardware, 1);
                        toggleHawsHeart(hardware._id);
                      }}
                    >
                      <i
                        id={hardware._id}
                        className={
                          prevToggleHaw === hardware._id
                            ? "fas fa-heart"
                            : "fas fa-plus"
                        }
                      ></i>
                    </span>
                  </div>
                  <div className="material-thumbnail-content-mid">
                    <span className="material-origin">
                      <i className="fas fa-palette globe"></i>
                      {hardware.color}
                    </span>
                  </div>
                  <div className="material-thumbnail-content-bottom">
                    <span className="material-price">
                      {formatter.format(hardware.price)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </React.Fragment>
      );
    }
  }
}

export default Thumbnails;
