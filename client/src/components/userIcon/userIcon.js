import React, { useState, useContext } from "react";
import "./userIcon.css";

const User = () => {
  return (
    <React.Fragment>
      <a href="/utilisateur" className="nav-user-links">
        mon compte<i className="fas fa-user nav-user-icons"></i>
        </a>
        <a href="/utilisateur" className="nav-user-links">
        panier<i className="fas fa-shopping-basket nav-user-icons"></i>
        </a>
    </React.Fragment>
  );
};

export default User;
