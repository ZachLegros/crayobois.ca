import React from 'react';
import './cvs.css';
import Thumnails from '../thumbnails/thumbnails';
import StateText from '../stateText/stateText';
import BuildState from '../buildState/buildState';

function Cvs(props) {
    return (
        <React.Fragment>
            <div className="app-wrapper">
                <section className="material-section">
                    <div className="materials-wrapper">
                        <Thumnails />
                        <StateText />
                        <BuildState />
                    </div>
                </section>
            </div>
        </React.Fragment>
    );
}

export default Cvs;