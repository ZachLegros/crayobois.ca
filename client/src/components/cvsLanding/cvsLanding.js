import React, { useState, useEffect } from "react";
import "./cvsLanding.css";

const CvsLanding = () => {
  return (
    <div className="cvs-landing">
      <span className="csv-landing-header">
        Créez le stylo qui <i>vous</i> convient
      </span>
      <span className="cvs-landing-header-text">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque quos
        tenetur ipsum molestiae nulla. Quis praesentium iure ratione nobis error
        minima, aliquam accusamus, illo voluptate quaerat quidem quo officiis
        voluptates.
      </span>
      <div className="cvs-landing-features">
        <div className="cvs-landing-feature">
        <i className="fas fa-tree feature-icon"></i>
          <span className="cvs-landing-feature-name">
            Grand inventaire de bois
          </span>
          <span className="cvs-landing-feature-text">
            Choisissez le matériau qui vous représente parmi notre grand
            inventaire de bois. Vous y trouverez sans doutes un matériau qui
            vous plaira.
          </span>
        </div>
        <div className="cvs-landing-feature">
        <i className="fas fa-fist-raised feature-icon"></i>
          <span className="cvs-landing-feature-name">Faits à la main</span>
          <span className="cvs-landing-feature-text">
            Tous nos stylos sont minutieusement fabriqués à la main par nos
            artisans tels que Vincent Legros et Dominique Violette.
          </span>
        </div>
        <div className="cvs-landing-feature">
          <span className="cvs-landing-feature-name">Fait au Québec</span>
          <span className="cvs-landing-feature-text">
            Tous nos stylos sont fabriqués et assemblés dans la ville de
            Gatineau, Québec.
          </span>
        </div>
        <div className="cvs-landing-feature">
        <i className="fas fa-sliders-h feature-icon"></i>
          <span className="cvs-landing-feature-name">
            Entièrement personnalisable
          </span>
          <span className="cvs-landing-feature-text">
            Personnalisez votre stylo en choisissant le bois, le style et le
            matériel utilisé pour l'assemblage.
          </span>
        </div>
      </div>
    </div>
  );
};

export default CvsLanding;
