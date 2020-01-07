import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import "./order.css";
const uuidv4 = require("uuid/v4");

const Order = props => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;
  const [cart, setCart] = useState(Object.assign([], user.shoppingCart));
  const [subTotal, setSubTotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const [priceBreakdown, setPriceBreakdown] = authContext.priceBreakdown;
  const breakdown = {
    subTotal: subTotal,
    taxes: taxes,
    shipping: shipping,
    total: total
  };

  const formatter = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });

  const getBreakdown = async () => {
    const subTotal = await overallSubTotal();
    const taxes = await taxCalc(subTotal);
    const total = await totalCalc(subTotal, taxes);
    setSubTotal(subTotal);
    setTaxes(taxes);
    setTotal(total);

    setPriceBreakdown({
      subTotal: subTotal,
      taxes: taxes,
      shipping: "0",
      total: total
    });
  };

  // get overall sub total
  const overallSubTotal = () => {
    let overallSubTotal = 0;

    for (var i = 0; i < cart.length; i++) {
      overallSubTotal += cart[i].subTotal;
    }

    return overallSubTotal;
  };

  // get value of taxes based on overall sub total
  const taxCalc = subTotal => {
    const TPS = (5 / 100) * subTotal;
    const TVQ = (9.975 / 100) * subTotal;

    return TPS + TVQ;
  };

  const totalCalc = (subTotal, taxes) => {
    return subTotal + taxes + shipping;
  };

  useEffect(() => {
    console.log(cart);

    getBreakdown();
  }, []);

  return (
    <React.Fragment>
      <section className="order-section">
        <div className="order-items-container">
          {cart.map(item => {
            return (
              <div key={uuidv4()} className="order-item">
                <div className="item-name">
                  {item.type === "Stylo personnalisé" ? (
                    <i className="fas fa-pen-alt order-pen-icon"></i>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                  <span className="order-item-text">
                    {item.type === "Stylo personnalisé"
                      ? `${item.pen[0].obj.name}, ${item.pen[1].obj.type +
                          " " +
                          item.pen[1].obj.color.toLowerCase()}`
                      : ""}
                    <span className="order-item-text item-quantity">
                      {" "}
                      x{item.quantity}
                    </span>
                  </span>
                </div>
                <span className="order-item-text right-aligned">
                  {formatter.format(item.subTotal)}
                </span>
              </div>
            );
          })}
        </div>
        <div className="order-total">
          <span className="order-item-text">
            Sous-total: {formatter.format(subTotal)}
          </span>
          <span className="order-item-text">
            Taxes (TPS et TVQ): {formatter.format(taxes)}
          </span>
          <span className="order-item-text">
            Livraison: {formatter.format(shipping)}
          </span>
          <span className="order-item-text">
            Total: {formatter.format(total)}
          </span>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Order;
