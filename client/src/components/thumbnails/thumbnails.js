import React, { useEffect } from "react";


function Thumbnails(props) {
    useEffect(() => {
    }, [])

  return (
    <React.Fragment>
      {props.mats.map(material => {
        return (
          <div className="material-thumbnail">
            <div className="thumbnail-img-container"><a href={material.path} target="blank"><img src={material.path} className="material-img" alt="" /></a></div>
            <div className="material-desc">
              <span className="material-name">{material.name}</span>
              <span className="material-origin">{material.origin}</span>
              <span className="material-price">{material.price}</span>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default Thumbnails;
