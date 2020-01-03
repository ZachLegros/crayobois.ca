import React, { useState, useContext, useRef, useEffect } from "react";
import AuthContext from "../context/authContext";
import "./checkout.css";

const Checkout = props => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  // testing product
  const [product, setProduct] = useState({
    price: 25.0,
    name: "comfy chair",
    description: "fancy chair, like new",
    quantity: 5
  });
  const [product2, setProduct2] = useState({
    price: 100.0,
    name: "Xbox",
    description: "Old but still working",
    quantity: 2
  });

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                reference_id: "PUHF",
                description: "Stylo personnalisé",

                custom_id: "Something7364",
                amount: {
                  currency_code: "CAD",
                  value: "200.00",
                  breakdown: {
                    item_total: {
                      currency_code: "CAD",
                      value: "200.00"
                    }
                  }
                },
                items: [
                  {
                    name: "Item 1",
                    description: "The best item ever",
                    sku: "xyz-2654",
                    unit_amount: {
                      currency_code: "CAD",
                      value: "100.00"
                    },
                    quantity: "1"
                  },
                  {
                    name: "Item 2",
                    description: "Not bad too",
                    sku: "zdc-3942",
                    unit_amount: {
                      currency_code: "CAD",
                      value: "50.00"
                    },
                    quantity: "2"
                  }
                ]
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
      <div className="paypal">
        {error && <div>Uh oh, an error occurred! {error.message}</div>}
        <h1>
          {product.description} for ${product.price}
        </h1>
        <div ref={paypalRef} />
      </div>
    </React.Fragment>
  );
};

export default Checkout;
