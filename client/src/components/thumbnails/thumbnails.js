import React, { useEffect, useState, useContext } from "react";
import CvsContext from "../context/cvsContext";

function Thumbnails(props) {
  const context = useContext(CvsContext);
  const [prevToggleId, setPrevToggleId] = context.prevToggleId;
  const [cvsPage, setCvsPage] = context.cvsPage;

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
      document.getElementById(id).classList.remove("fas");
      setPrevToggleId(0);
      //if no other thumbnail is selected
    } else if (prevToggleId === 0) {
      document.getElementById(id).classList.add("fas");
      setPrevToggleId(id);
      //if another thumbnail is selected in another page
    } else if (isOnPage === false) {
      document.getElementById(id).classList.add("fas");
      setPrevToggleId(id);
      //if another thumbnail is selected in page
    } else {
      document.getElementById(prevToggleId).classList.remove("fas");
      document.getElementById(id).classList.add("fas");
      setPrevToggleId(id);
    }
  }

  useEffect(() => {}, []);


  if (cvsPage == "materials") {
    if (context.filteredMats.length === 0) {
      return (
        <React.Fragment>
          {context.materials.map(material => {
            return (
              <div className="material-thumbnail" key={material._id}>
                <div className="thumbnail-img-container">
                  <a
                    className="thumbnail-img-link"
                    href={material.path}
                    target="blank"
                  >
                    <img src={material.path} className="material-img" alt="" />
                    <i className="fas fa-search-plus"></i>
                  </a>
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
                          context.prevToggleId === material._id
                            ? "far fa-heart fas"
                            : "far fa-heart"
                        }
                      ></i>
                    </a>
                  </div>
                  <div className="material-thumbnail-content-mid">
                    <span className="material-name">{material.name}</span>
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
                  <a
                    className="thumbnail-img-link"
                    href={material.path}
                    target="blank"
                  >
                    <img src={material.path} className="material-img" alt="" />
                    <i className="fas fa-search-plus"></i>
                  </a>
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
                          context.prevToggleId === material._id
                            ? "far fa-heart fas"
                            : "far fa-heart"
                        }
                      ></i>
                    </a>
                  </div>
                  <div className="material-thumbnail-content-mid">
                    <span className="material-name">{material.name}</span>
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
  }
}

export default Thumbnails;
