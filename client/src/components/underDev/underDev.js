import React from "react";
import "./underDev.css";

const UnderDev = props => {
  return (
    <React.Fragment>
      <section className="under-dev">
        <div className="under-dev-animation">
          <img src="https://firebasestorage.googleapis.com/v0/b/crayobois-fe722.appspot.com/o/images%2Fmonitor.png?alt=media&token=a7ba09fc-05bf-4ed6-af83-e2b3ae01161f" className="monitor" />
          <img src="https://firebasestorage.googleapis.com/v0/b/crayobois-fe722.appspot.com/o/images%2Fgear.png?alt=media&token=68734820-12ee-4167-a34a-c9d08dd10fb4" className="gear" />
        </div>
        <span className="under-dev-header">En cours de développement...</span>
      </section>
    </React.Fragment>
  );
};

export default UnderDev;
