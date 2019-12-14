import React, { useState, useEffect, useContext } from "react";
import Nav from "./components/nav/nav";
import Home from "./components/home/home";
import Cvs from "./components/cvs/cvs";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavLinksProvider } from "./components/navLinksContext";

function App() {
  const [mat, setMat] = useState();

  useEffect(() => {
    async function getMat() {
        await fetch("/creez-votre-stylo")
            .then(res => res.json())
            .then(json => {console.log("From fetch: ", json)})
            .then(mats => setMat(mats))
    }
    console.log("From App hook: ", mat);
    getMat();
  }, []);

  return (
    <React.Fragment>
      <NavLinksProvider>
        <Nav />
      </NavLinksProvider>
      <Router>
        <Route path="/" exact render={props => <Home {...props} />} />
          <Route
            path="/creez-votre-stylo"
            exact
            render={props => <Cvs {...props} mats={[mat, setMat]}/>}
          />
      </Router>
    </React.Fragment>
  );
}

export default App;
