import React from "react";
import "./spinner.css";

const Spinner = () => {
  return (
    <React.Fragment>
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
    </React.Fragment>
  );
};

export default Spinner;
