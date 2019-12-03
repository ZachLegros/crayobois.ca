import React from 'react';
import log from './icons/log.png';
import pen from './icons/pen.png';

function BuildState() {
    return (
        <React.Fragment>
            <div className="cvs-building-status">
                <div className="cvs-status-thumbnail current">
                    <img src={log} className="cvs-status-img"/>
                    <span className="status-txt">Matériaux</span>
                </div>
                <div className="cvs-status-thumbnail">
                    <img src={pen} className="cvs-status-img"/>
                    <span className="status-txt">Matériels</span>
                </div>
                <div className="cvs-status-thumbnail">
                    <div className="cvs-checkout">
                        <i className="fas fa-shopping-cart" aria-hidden="true"></i>  
                    </div>
                    <span className="status-txt">Commande</span>
                </div>
                <a className="cvs-next">Étape suivante</a>
            </div>
        </React.Fragment>
    );
}

export default BuildState;
