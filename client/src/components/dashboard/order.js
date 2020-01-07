import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import "./order.css";
const uuidv4 = require("uuid/v4");

const Order = props => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;
  const [cart, setCart] = useState(Object.assign([], user.shoppingCart));
  const [subTotal, setSubTotal] = useState(0);

  const formatter = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });

  useEffect(() => {
    console.log(cart);
  });

  return (
    <React.Fragment>
      <section className="order-section">
        {cart.map(item => {
          return (
            <div key={uuidv4()} className="order-items-container">
              <span className="order-item-text">{item.type}</span>
              <span className="order-item-text">{`x${item.quantity}`}</span>
              <span className="order-item-text">{formatter.format(item.subTotal)}</span>
            </div>
          );
        })}
      </section>
    </React.Fragment>
  );
};

export default Order;
