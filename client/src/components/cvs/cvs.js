import React, { useEffect, useState, useContext } from "react";
import "./cvs.css";
import Thumbnails from "../thumbnails/thumbnails";
import TopState from "../topState/TopState";
import BuildState from "../buildState/buildState";
import Spinner from "../spinner/spinner";

const Cvs = () => {
  const [loading, setLoading] = useState(true);
  const [mat, setMat] = useState(null);

  useEffect(() => {
    const nav = document.getElementsByClassName("navbar");
    nav[0].style.backgroundColor = "var(--black)";

    //fetching materials
    async function getMats() {
      const url = "/mats";
      const response = await fetch(url);
      const data = await response.json();
      setMat(data, setLoading(false));
    }

    getMats();
  }, []);

  return (
    <div className="app-wrapper">
      {loading || !mat ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section>
            <div className="materials-wrapper">
              <div className="materials">
                <Thumbnails mats={mat} loading={loading} />
              </div>
            </div>
            <TopState />
          </section>
          <BuildState mats={mat} setLoading={() => {setLoading(!loading)}} />
        </React.Fragment>
      )}
    </div>
  );
};

const arePropsEqual = (prevProps, nextProps) => {
  return nextProps != prevProps;
};

export default React.memo(Cvs, arePropsEqual);
