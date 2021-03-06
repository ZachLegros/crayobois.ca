import React, { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../context/authContext";
import "./payment.css";
import Success from "./success";
const uuidv4 = require("uuid/v4");

const Payment = props => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;
  const [cart, setCart] = useState(Object.assign([], user.shoppingCart));
  const [error, setError] = useState(null);
  const [success, setSuccess] = authContext.success;
  const paypalRef = useRef();
  const purchaseUnits = authContext.createPurchaseUnits(cart);

  const formatter = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });

  useEffect(() => {
    window.paypal
      .Buttons({
        locale: "fr_CA",
        style: {
          layout: "vertical",
          color: "blue",
          label: "checkout",
          shape: "pill",
          size: "responsive",
          fundingicons: true
        },

        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: purchaseUnits
          });
        },

        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          authContext.addOrderToClient(order, [...cart]);
          props.emptyCart();
          authContext.updateCart([]);
          authContext.removeFromCart("*");
          setSuccess(true);
        },

        onError: err => {
          setError(err);
        }
      })
      .render(paypalRef.current);
  }, []);

  return (
    <React.Fragment>
      <div className="paypal">
        {/*failed*/}
        {error && <div>Une erreur est survenue lors de la connexion aux services de PayPal: {error.message}</div>}
        {/* payment options*/}
        <span className="safe-payment-header">
          Paiement sécurisé par PayPal<i className="fas fa-check-circle"></i>
        </span>
        <div className="paypal-buttons" ref={paypalRef} />
      </div>
    </React.Fragment>
  );
};

export default Payment;
