import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import "./payment.css";
const uuidv4 = require("uuid/v4");

const Payment = props => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;
  const [cart, setCart] = useState(Object.assign([], user.shoppingCart));
  const [subTotal, setSubTotal] = useState(0);

  const formatter = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });

  return (
    <React.Fragment>

    </React.Fragment>
  );
};

export default Payment;
