import React from 'react';
import Nav from './components/nav/nav';
import Landing from './components/landing/landing';
import Cvs from './components/cvs/cvs';
import Perks from './components/perks/perks';
const uuidv4 = require('uuid/v4');

function App() {
  var cvsIsActive = false;
  var color;

  const homeNavLinks = ([
    {id: uuidv4(), text: 'À propos', path: "/"},
    {id: uuidv4(), text: 'Galerie', path: "/"},
    {id: uuidv4(), text: 'Créez votre stylo', path: "/creez-votre-stylo"},
    {id: uuidv4(), text: 'Contact', path: "/"}
  ]); 

  const cvsNavLinks = ([
    {id: uuidv4(), text: 'Accueil', path: "/"},
    {id: uuidv4(), text: 'À propos', path: "/"},
    {id: uuidv4(), text: 'Galerie', path: "/"},
    {id: uuidv4(), text: 'Contact', path: "/"}
  ]);

  /*Home rendering*/
  if (cvsIsActive === false) {
    color = "transparent";
    return (
      <React.Fragment>
        <Nav links={homeNavLinks} color={color}/>
        <Landing />
        <Perks />
      </React.Fragment>
    );
  } 
  /*Cvs rendering */
  else if (cvsIsActive === true) {
    color = "var(--black)";
    return (
      <React.Fragment>
        <Nav links={cvsNavLinks} color={color}/>
        <Cvs />
      </React.Fragment>
    );
  }
}

export default App;
