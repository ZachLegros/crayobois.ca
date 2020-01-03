import React, { useState, useContext, useRef, useEffect } from "react";
import AuthContext from "../context/authContext";

const Checkout = props => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  // testing product
  const product = useState({

  });

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  currency_code: "CAD",
                  value: product.price
                }
              }
            ]
          });
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
  }, [product.description, product.price]);

  // testing
  if (paidFor) {
    return (
      <div>
        <h1>Congrats, you just bought {product.name}!</h1>
      </div>
    );
  }

  return (
    <React.Fragment>
      return (
      <div>
        {error && <div>Uh oh, an error occurred! {error.message}</div>}
        <h1>
          {product.description} for ${product.price}
        </h1>
        <img alt={product.description} src={product.image} width="200" />
        <div ref={paypalRef} />
      </div>
      ); }
    </React.Fragment>
  );
};

export default Checkout;
