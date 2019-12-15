import React, { useEffect, useState } from "react";
const uuidv4 = require("uuid/v4");

function Thumbnails(props) {
  const [type, setType] = useState("Loupe d'érable teinté double");

  const filter = props.mats.filter(obj => {
  return obj.type === type
  });

  const formatter = new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2
  });

  function favToggle(id){
    const thumbnail = document.getElementById("#" + id);

    console.log(thumbnail);
  }

    useEffect(() => {
      console.log(props.mats)
    }, [])

  return (
    <React.Fragment>
      {}
      {filter.map(material => {
        return (
          <div className="material-thumbnail" key={material._id} id={material._id}>
            <div className="thumbnail-img-container">
              <a className="thumbnail-img-link" href={material.path} target="blank">
                <img src={material.path} className="material-img" alt="" />
                <i className="fas fa-search-plus"></i>
              </a>
            </div>
            <div className="material-thumbnail-content">
              <div className="material-thumbnail-content-top">
                <span className="material-origin"><i className="fas fa-globe-americas"/>{material.origin}</span>
                <i className="far fa-heart" onClick={favToggle(material._id)}></i>
              </div>
              <div className="material-thumbnail-content-mid">
                <span className="material-name">{material.name}</span>
              </div>
              <div className="material-thumbnail-content-bottom">
                <span className="material-price">{formatter.format(material.price)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default Thumbnails;
