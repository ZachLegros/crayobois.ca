import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/authContext";
import "./gallery.css";
import UnderDev from "../underDev/underDev";

const Gallery = props => {
  const context = useContext(AuthContext);

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <div className="gallery">
        {/*
         <header>
          <span className="cvs-features-header">
            Galerie
            <i className="fas fa-camera-retro cvs-features-header-icon"></i>
          </span>
        </header>
        <section className="gallery-section">
          <div className="image-container">
            <img
              src="https://thepaintpeople.com/wp-content/uploads/2015/09/prepare-bare-wood-staining.jpg"
              className="gallery-image"
            />
            <span className="image-description">
              Loupe d'amboine - Bolt action
            </span>
          </div>
          <div className="image-container">
            <img
              src="https://thepaintpeople.com/wp-content/uploads/2015/09/prepare-bare-wood-staining.jpg"
              className="gallery-image"
            />
            <span className="image-description">
              Loupe d'amboine - Bolt action
            </span>
          </div>
          <div className="image-container">
            <img
              src="https://thepaintpeople.com/wp-content/uploads/2015/09/prepare-bare-wood-staining.jpg"
              className="gallery-image"
            />
            <span className="image-description">
              Loupe d'amboine - Bolt action
            </span>
          </div>
          <div className="image-container">
            <img
              src="https://thepaintpeople.com/wp-content/uploads/2015/09/prepare-bare-wood-staining.jpg"
              className="gallery-image"
            />
            <span className="image-description">
              Loupe d'amboine - Bolt action
            </span>
          </div>
        </section>
        */}
        <UnderDev />
      </div>
    </React.Fragment>
  );
};

export default Gallery;
