import React from 'react';
import Landing from '../landing/landing';
import Perks from '../perks/perks';

function Home() {
    return (
        <React.Fragment>
            <Landing />
            <Perks />
        </React.Fragment>
    );
}

export default Home;