import React from 'react';
const uuidv4 = require('uuid/v4');

function Thumbnails(props) {
    const path = './bois/Amarante.jpg';

    return (
        <React.Fragment>
            <div className="material-thumbnail">
                <img src={path} className="material-img"/>
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