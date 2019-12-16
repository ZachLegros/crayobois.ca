import React, { useEffect, useState, useContext } from "react";
import { CvsContext } from "../context/cvsContext";

function Thumbnails(props) {
  const [cvs, setCvs] = useContext(CvsContext);

  const filter = props.mats.filter(obj => {
    return obj.type === cvs.type;
    });

  const formatter = new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2
  });

  function test(id) {
    console.log(id);
  }

    useEffect(() => {
      
    }, [])

  return (
    <React.Fragment>
      {props.loading || !props.mats ? (
          <div />
        ) : (
      filter.map(material => {
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
                <a onClick={() => {test(material._id)}}><i className="far fa-heart"></i></a>
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
      })
        )};
    </React.Fragment>
  );
}

export default Thumbnails;
