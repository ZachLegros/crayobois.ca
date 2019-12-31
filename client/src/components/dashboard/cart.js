import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";

const Cart = props => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;

  return (
    <React.Fragment>
      <span className="dashboard-content-header">Mon panier</span>
      <button onClick={() => console.log(user.shoppingCart)}></button>
    </React.Fragment>
  );
};

export default Cart;
