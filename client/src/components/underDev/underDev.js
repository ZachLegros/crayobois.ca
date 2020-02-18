import React from "react";
import "./underDev.css";
import monitor from "./images/monitor.png";
import gear from "./images/gear.png";

const UnderDev = props => {
  return (
    <React.Fragment>
      <section className="under-dev">
        <div className="under-dev-animation">
          <img src={monitor} className="monitor" />
          <img src={gear} className="gear" />
        </div>
        <span className="under-dev-header">En cours de développement...</span>
      </section>
    </React.Fragment>
  );
};

export default UnderDev;
