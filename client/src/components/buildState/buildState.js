import React, { useState } from "react";
import log from "./icons/log.png";
import pen from "./icons/pen.png";
import SubTotal from "../subTotal/subTotal";
import { SubTotalProvider } from "../subTotalContext";

function BuildState() {
  
  return (
    <React.Fragment>
      <div className="cvs-building-status">
        <div className="cvs-building-content">
          <div className="cvs-thumbnails-wrapper">
            <div className="cvs-status-thumbnail current">
              <img src={log} className="cvs-status-img" alt=""/>
              <span className="status-txt">Matériaux</span>
            </div>
            <div className="cvs-status-thumbnail">
              <img src={pen} className="cvs-status-img" alt=""/>
              <span className="status-txt">Matériels</span>
            </div>
            <div className="cvs-status-thumbnail">
              <div className="cvs-checkout">
                <i className="fas fa-shopping-cart" aria-hidden="true"></i>
              </div>
              <span className="status-txt">Commande</span>
            </div>
          </div>
          <SubTotalProvider>
            <SubTotal />
          </SubTotalProvider>
          {/*<a className="cvs-next" href="/">Étape suivante</a>*/}
        </div>
      </div>
    </React.Fragment>
  );
}

export default BuildState;
