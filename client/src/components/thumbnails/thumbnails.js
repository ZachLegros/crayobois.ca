import React, { useEffect, useState } from "react";


function Thumbnails(props) {
  const [type, setType] = useState("Exotique");

  const filter = props.mats.filter(obj => {
  return obj.type === type
  });

  const formatter = new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2
  });
  
    useEffect(() => {
    }, [])

  return (
    <React.Fragment>
      {}
      {filter.map(material => {
        return (
          <div className="material-thumbnail">
            <div className="thumbnail-img-container"><a href={material.path} target="blank"><img src={material.path} className="material-img" alt="" /></a></div>
            <div className="material-desc">
              <span className="material-name">{material.name}</span>
              <span className="material-origin">{material.origin}</span>
              <span className="material-price">{formatter.format(material.price)}</span>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default Thumbnails;
