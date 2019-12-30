import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";

const Profile = props => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;

  return (
    <React.Fragment>
      <span className="dashboard-content-header">Mon profil</span>
      <span>{user.email}</span>
    </React.Fragment>
  );
};

export default Profile;
