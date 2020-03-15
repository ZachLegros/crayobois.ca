import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/authContext";
import "./gallery.css";
import Footer from "../footer/footer";

const Gallery = props => {
  const context = useContext(AuthContext);
  const gallery = context.gallery;

  const lazyLoad = target => {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;

          img.classList.add('gradient');
  
          observer.disconnect();
        }
      });
    });
  
    io.observe(target)
  };

  useEffect(() => {
    if (gallery.lenght !== 0) {
      context.getGallery();
    } else {
      const targets = document.querySelectorAll('img');
      targets.forEach(lazyLoad);
      console.log("test");
    }
  }, [gallery]);

  return (
    <React.Fragment>
      <div className="gallery">
         <header className="gallery-header">
          <span className="cvs-features-header">
            Galerie
            <i className="fas fa-camera-retro cvs-features-header-icon"></i>
          </span>
        </header>
        <section className="gallery-section">
          {!gallery ? <React.Fragment /> : (
            gallery.map((img, index) => {
              return(
                <div className="image-container" key={index}>
                  <img
                    src={img.url}
                    className="gallery-image"
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
