import React from 'react';
import Bois from './bois/Amarante.jpg';

function Thumbnails(props) {
    return (
        <React.Fragment>
            <div className="material-thumbnail">
                <img src={Bois} className="material-img" alt=""/>
                <div className="material-desc">
                    <span className="material-name">Amarante</span>
                    <span className="material-origin">Amérique du Sud (Brésil)</span>
                    <span className="material-price">$10</span>
                </div>
            </div>
            <div className="material-thumbnail">
                <img src={Bois} className="material-img" alt=""/>
                <div className="material-desc">
                    <span className="material-name">Amarante</span>
                    <span className="material-origin">Amérique du Sud (Brésil)</span>
                    <span className="material-price">$10</span>
                </div>
            </div>
            <div className="material-thumbnail">
                <img src={Bois} className="material-img" alt=""/>
                <div className="material-desc">
                    <span className="material-name">Amarante</span>
                    <span className="material-origin">Amérique du Sud (Brésil)</span>
                    <span className="material-price">$10</span>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Thumbnails;