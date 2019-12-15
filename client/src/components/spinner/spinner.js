import React from "react";
import "./spinner.css";

const Spinner = () => {
  return (
    <React.Fragment>
      <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>
    </React.Fragment>
  );
};

export default Spinner;
