/*
import React, { useState, useContext, useRef, useEffect } from "react";
import AuthContext from "../context/authContext";
import "./checkout.css";

const Checkout = props => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  const purchaseUnits = authContext.createPurchaseUnits();
  

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create(purchaseUnits);
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
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
        <h1>
          Buy test
        </h1>
        <div ref={paypalRef} />
      </div>
    </React.Fragment>
  );
};

export default Checkout;
*/