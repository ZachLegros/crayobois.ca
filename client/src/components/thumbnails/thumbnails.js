import React, { useEffect, useState, useContext } from "react";
import CvsContext from "../context/cvsContext";

function Thumbnails(props) {
  const context = useContext(CvsContext);
  const [prevToggleId, setPrevToggleId] = useState(0);
  const formatter = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });

  function toggleHeart(id) {

    if (prevToggleId === id) {
      document.getElementById(id).classList.remove("fas");
      setPrevToggleId(0);
    } else {
      document.getElementById(id).classList.add("fas");
      setPrevToggleId(id);
    }
  }

  useEffect(() => {}, []);

  if (context.filteredMats.length === 0) {
    return (
      <React.Fragment>
        {context.materials.map(material => {
          return (
            <div
              className="material-thumbnail"
              key={material._id}
            >
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
                    <i id={material._id} className="far fa-heart"></i>
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
            <div
              className="material-thumbnail"
              key={material._id}
            >
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
                    <i id={material._id} className="far fa-heart"></i>
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

export default Thumbnails;
