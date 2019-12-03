import React from "react";
import './perks.css';
import fist from './icons/fist.png';
import tree from './icons/tree.png';
import sliders from'./icons/sliders.png';

function Perks() {
    return (
        <React.Fragment>
            <div className="perks">
                <h1>Nos stylos sont</h1>
                <div className="perks-icons">
                    <div className="perks-block">
                        <img src={fist}></img>
                        <span>Faits à la main</span>
                    </div>
                    <div className="perks-block">
                        <img src={tree}></img>
                        <span>Faits de bois exotique</span>
                    </div>
                    <div className="perks-block">
                        <img src={sliders}></img>
                        <span>Personnalisés</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Perks;