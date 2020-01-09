import React, { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../context/authContext";
import "./payment.css";
const uuidv4 = require("uuid/v4");

const Payment = props => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;
  const [cart, setCart] = useState(Object.assign([], user.shoppingCart));
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  const purchaseUnits = authContext.createPurchaseUnits(cart);

  const formatter = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });

  useEffect(() => {
    console.log(purchaseUnits);

    window.paypal
      .Buttons({
        locale: "fr_CA",
        style: {
          layout: "vertical",
          color: "silver",
          label: "checkout",
          shape: "pill",
          size: "responsive",
          tagline: false,
          fundingicons: true
        },

        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: purchaseUnits
          });
        },

        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          authContext.updateCart([]);
          authContext.removeFromCart("*");
          setPaidFor(true);
          props.resetCheckout();
          console.log(order);
        },

        onError: err => {
          setError(err);
          console.error(err);
        }
      })
      .render(paypalRef.current);
  }, []);

  // testing
  if (paidFor) {
    return (
      <div>
        <h1>Congrats, you just bought !</h1>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="paypal">
        {error && <div>Uh oh, an error occurred! {error.message}</div>}
        <h1>Buy test</h1>
        <div ref={paypalRef} />
      </div>
    </React.Fragment>
  );
};

export default Payment;
