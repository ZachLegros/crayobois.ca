import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/authContext";
import "./gallery.css";

const Gallery = props => {
  const context = useContext(AuthContext);

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <header>
        <span className="gallery-header">Galerie</span>
      </header>
      <section className="gallery-section">
        <div className="image-container">
          <span className="image-description">
            This is the image description
          </span>
          <img
            src="https://thepaintpeople.com/wp-content/uploads/2015/09/prepare-bare-wood-staining.jpg"
            className="gallery-image"
          />
        </div>
        <div className="image-container">
          <span className="image-description">
            This is the image description
          </span>
          <img
            src="https://thepaintpeople.com/wp-content/uploads/2015/09/prepare-bare-wood-staining.jpg"
            className="gallery-image"
          />
        </div>
        <div className="image-container">
          <span className="image-description">
            This is the image description
          </span>
          <img
            src="https://thepaintpeople.com/wp-content/uploads/2015/09/prepare-bare-wood-staining.jpg"
            className="gallery-image"
          />
        </div>
        <div className="image-container">
          <span className="image-description">
            This is the image description
          </span>
          <img
            src="https://thepaintpeople.com/wp-content/uploads/2015/09/prepare-bare-wood-staining.jpg"
            className="gallery-image"
          />
        </div>
        <div className="image-container">
          <span className="image-description">
            This is the image description
          </span>
          <img
            src="https://thepaintpeople.com/wp-content/uploads/2015/09/prepare-bare-wood-staining.jpg"
            className="gallery-image"
          />
        </div>
        <div className="image-container">
          <span className="image-description">
            This is the image description
          </span>
          <img
            src="https://thepaintpeople.com/wp-content/uploads/2015/09/prepare-bare-wood-staining.jpg"
            className="gallery-image"
          />
        </div>
        <div className="image-container">
          <span className="image-description">
            This is the image description
          </span>
          <img
            src="https://thepaintpeople.com/wp-content/uploads/2015/09/prepare-bare-wood-staining.jpg"
            className="gallery-image"
          />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Gallery;
