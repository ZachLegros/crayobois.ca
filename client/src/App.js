import React, { useState } from "react";
import Nav from "./components/nav/nav";
import Home from "./components/home/home";
import Cvs from "./components/cvs/cvs";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Nav />
      <Router>
        <Route path="/" exact component={Home}/>
        <Route path="/creez-votre-stylo" exact component={Cvs} />
      </Router>
    </React.Fragment>
  );
}

export default App;
