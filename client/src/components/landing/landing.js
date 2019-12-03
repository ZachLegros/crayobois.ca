import React from 'react';
import './landing.css';
import './landing-script';

function Landing() {
    return (
    <React.Fragment>
        <div id="landing-wrapper">
            <div id="landing-txt">
                <div className="landing-reveal">
                    <h1>Crayobois</h1>
                </div>
                <div className="landing-reveal">
                    <h2>Le stylo qu'il vous faut!</h2>
                </div>
                <a className="btn" href="/creez-votre-stylo">Créez le vôtre<i className="fas fa-long-arrow-alt-right" aria-hidden="true" /></a>
            </div>
            <script src="./landing-script.js"></script> 
        </div>
    </React.Fragment>
    )
}

export default Landing;