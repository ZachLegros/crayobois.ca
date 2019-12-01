import React from 'react';
import './App.css';
import Nav from './components/nav/nav';
import Home from './components/home/home';
//import Cvs from './components/cvs/cvs';
const uuidv4 = require('uuid/v4');

function App() {
  var cvsIsActive = false;

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
    return (
      <React.Fragment>
        <Nav links={homeNavLinks}/>
        <Home />
      </React.Fragment>
    );
  } 
  /*Cvs rendering */
  else if (cvsIsActive === true) {
    return (
      <React.Fragment>
        <Nav links={cvsNavLinks}/>
      </React.Fragment>
    );
  }
}

export default App;
