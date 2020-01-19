import React, { useState, useEffect } from "react";
import "./cvsLanding.css";
import ScrollReveal from "scrollreveal";

const CvsLanding = () => {

  useEffect(() => {
    ScrollReveal().reveal(".f1");
    ScrollReveal().reveal(".f2", { delay: 75 });
    ScrollReveal().reveal(".f3", { delay: 150 });
    ScrollReveal().reveal(".f4", { delay: 225 });
    ScrollReveal().reveal(".cvs-feature-header-container");
});
  return (
    <section className="cvs-landing">
      <div className="cvs-feature-header-container">
        <span className="cvs-features-header">Nos atouts<i className="fas fa-tools cvs-features-header-icon"></i></span>
      </div>
      <div className="cvs-landing-features">
        <div className="cvs-landing-feature f1">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/crayobois-fe722.appspot.com/o/icons%2Ftree.png?alt=media&token=6512b6fc-2499-4e20-ae6a-e34d9b00ad7b"
            className="feature-icon"
          />
          <span className="cvs-landing-feature-name">
            Grand inventaire de bois
          </span>
          <span className="cvs-landing-feature-text">
            Choisissez le matériau qui vous représente parmi notre grand
            inventaire de bois. Vous y trouverez sans doutes un matériau qui
            vous plaira.
          </span>
        </div>
        <div className="cvs-landing-feature f2">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/crayobois-fe722.appspot.com/o/icons%2Ffist.png?alt=media&token=be335169-fa2e-4ee7-9830-75c2383dfb5f"
            className="feature-icon"
          />
          <span className="cvs-landing-feature-name">Fait à la main</span>
          <span className="cvs-landing-feature-text">
            Tous nos stylos sont minutieusement fabriqués à la main par les
            artisans Vincent Legros et Dominique Violette.
          </span>
        </div>
        <div className="cvs-landing-feature f3">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/crayobois-fe722.appspot.com/o/icons%2Fquebec.png?alt=media&token=55f70c1f-2bfb-425f-a442-545e2a06048f"
            className="feature-icon"
          />
          <span className="cvs-landing-feature-name">Fait au Québec</span>
          <span className="cvs-landing-feature-text">
            Tous nos stylos sont fabriqués et assemblés dans la ville de
            Gatineau, Québec.
          </span>
        </div>
        <div className="cvs-landing-feature f4">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/crayobois-fe722.appspot.com/o/icons%2Fsliders.png?alt=media&token=55f2a038-49c7-4646-b7c9-bb0fa40f3f9a"
            className="feature-icon"
          />
          <span className="cvs-landing-feature-name">
            Entièrement personnalisable
          </span>
          <span className="cvs-landing-feature-text">
            Personnalisez votre stylo en choisissant le bois, le style et le
            matériel utilisé pour l'assemblage.
          </span>
        </div>
      </div>
    </section>
  );
};

export default CvsLanding;
