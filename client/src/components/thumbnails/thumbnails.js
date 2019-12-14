import React, { useState, useEffect } from "react";
import "./bois/Amarante.jpg";

function Thumbnails(props) {
    useEffect(() => {
        console.log("From Thumbnails hook: ", props.mats[0]);
    }, [])

  return (
    <h1>yo</h1>  
    /*
    <React.Fragment>
      {mat.map(material => {
        return (
          <div className="material-thumbnail">
            <img src={material.path} className="material-img" alt="" />
            <div className="material-desc">
              <span className="material-name">{material.name}</span>
              <span className="material-origin">{material.origin}</span>
              <span className="material-price">{material.price}</span>
            </div>
          </div>
        );
      })}
    </React.Fragment>*/
  );
}

export default Thumbnails;
