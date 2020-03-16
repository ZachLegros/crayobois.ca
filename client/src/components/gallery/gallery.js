import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/authContext";
import "./gallery.css";
import Footer from "../footer/footer";
import Spinner from "../spinner/spinner";

const Gallery = props => {
  const context = useContext(AuthContext);
  const gallery = context.gallery;

  const load = () => {
    const targets = document.querySelectorAll('gallery-image');
    targets.forEach(lazyLoad);
  }

  const lazyLoad = target => {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-lazy');

          img.setAttribute('src', src);
        
          observer.disconnect();
        }
      });
    });
  
    io.observe(target)
  };

  useEffect(() => {
    if (gallery.lenght !== 0) {
      context.getGallery();
    } 
  }, []);

  return (
    <React.Fragment>
      <div className="gallery gradient">
         <header className="gallery-header">
          <span className="cvs-features-header">
            Galerie
            <i className="fas fa-camera-retro cvs-features-header-icon"></i>
          </span>
        </header>
        {gallery.length === 0 ? <Spinner /> : <React.Fragment />}
        <section className="gallery-section">
          {gallery.length === 0 ? <React.Fragment /> : (
            gallery.map((img, index) => {
              return(
                <div className="image-container" key={index}>
                  <img
                    src={img.url}
                    id={img._id}
                    className="gallery-image"
                    onLoad={() => {}}
                  />
                  <span className="image-description">
                    {img.description}
                  </span>
                </div>
              )
            })
          )}
        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Gallery;
