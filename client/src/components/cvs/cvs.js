import React, { useEffect, useState } from "react";
import "./cvs.css";
import Thumbnails from "../thumbnails/thumbnails";
import StateText from "../stateText/stateText";
import BuildState from "../buildState/buildState";
import Spinner from "../spinner/spinner";

const Cvs = () => {
  const [loading, setLoading] = useState(true);
  const [mat, setMat] = useState(null);

  useEffect(() => {
    const nav = document.getElementsByClassName("navbar");
    nav[0].style.backgroundColor = "var(--black)";

    //fetching
    async function getMats() {
      const url = "/mats";
      const response = await fetch(url);
      const data = await response.json();
      setMat(data, setLoading(false));
    }

    getMats();

    }, []);

  return (
    <React.Fragment>
      <div className="app-wrapper">
        <section>
          <div className="materials-wrapper">
              {loading || !mat ? <Spinner /> : <div className="materials"><Thumbnails mats={mat}/></div>}
          </div>
          <StateText />
        </section>
        <BuildState />
      </div>
    </React.Fragment>
  );
};

const arePropsEqual = (prevProps, nextProps) => {
  return (nextProps != prevProps);
};

export default React.memo(Cvs, arePropsEqual);
