import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import "./cart.css";
import Order from "./order";
import Payment from "./payment";
import { useHistory } from "react-router-dom";
import Success from "./success";
const uuidv4 = require("uuid/v4");

const Cart = props => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;
  const [cart, setCart] = props.cart;
  const [subTotal, setSubTotal] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState("cart");
  const [success, setSuccess] = authContext.success;
  let history = useHistory();

  const formatter = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });

  const resetCheckout = () => {
    setCart([]);
    user.shoppingCart = [];
  };

  const getSubTotal = cart => {
    var value = 0;

    if (cart.length === 0) {
      value = 0;
    } else {
      for (var i = 0; i < cart.length; i++) {
        var priceOfObjects = 0;
        for (var e = 0; e < cart[i].pen.length; e++) {
          priceOfObjects += cart[i].pen[e].obj.price;
        }

        value += priceOfObjects * cart[i].quantity;
      }
    }

    return value;
  };

  const setQuantity = (id, index) => {
    const input = document.getElementById(id);

    if (input.value > 10) {
      input.value = 10;
    } else if (input.value < 1) {
      input.value = 1;
    }

    const value = parseInt(input.value);

    // updating the cart
    var newCart = Object.assign([], cart);
    newCart[index].quantity = value;

    // updating both the inner and outer (from context) sub total
    const subTotal = getSubTotal(newCart);
    newCart[index].subTotal =
      newCart[index].quantity * newCart[index].pricesSum;
    authContext.updateCart(newCart);
    setSubTotal(subTotal);
  };

  useEffect(() => {
    setSubTotal(getSubTotal(cart));
    return () => {
      setSuccess(false);
    };
  }, [cart]);

  return (
    <React.Fragment>
      {success ? (
        <Success />
      ) : cart.length === 0 ? (
        <React.Fragment>
          <span className="dashboard-content-header">Mon panier</span>
          <span className="dashboard-notice">
            Il n'y a aucun stylo dans votre panier
          </span>
          <span
            className="profile-change-password cart-action"
            onClick={() => {
              history.push("/creez-votre-stylo");
            }}
          >
            Créez votre stylo
          </span>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="checkout-nav">
            <div className="checkout-states">
              <span
                className={
                  checkoutStep === "cart"
                    ? "checkout-state-link active-checkout-state"
                    : "checkout-state-link"
                }
              >
                Panier
              </span>
              <span className="checkout-state-icon-container">
                <i className="fas fa-chevron-right checkout-state-icon" />
              </span>
              <span
                className={
                  checkoutStep === "order"
                    ? "checkout-state-link active-checkout-state"
                    : "checkout-state-link"
                }
              >
                Commande
              </span>
              <span className="checkout-state-icon-container">
                <i className="fas fa-chevron-right checkout-state-icon" />
              </span>
              <span
                className={
                  checkoutStep === "payment"
                    ? "checkout-state-link active-checkout-state"
                    : "checkout-state-link"
                }
              >
                Paiement
              </span>
            </div>
          </div>
          <div className="cart-content-footer bold">
            {checkoutStep === "cart" ? (
              `Sous-total: ${formatter.format(subTotal)}`
            ) : (
              <span
                className="profile-change-password cart-prev-btn"
                onClick={() => {
                  if (checkoutStep === "order") {
                    setCheckoutStep("cart");
                  } else {
                    setCheckoutStep("order");
                  }
                }}
              >
                <i className="fas fa-chevron-left prev-btn-icon" />
                Précédent
              </span>
            )}
            <span
              className={
                checkoutStep === "cart"
                  ? "mobile-prev-btn hidden"
                  : "mobile-prev-btn"
              }
              onClick={() => {
                if (checkoutStep === "order") {
                  setCheckoutStep("cart");
                } else {
                  setCheckoutStep("order");
                }
              }}
            >
              <i className="fas fa-chevron-left mobile-prev-icon" />
              Précédent
            </span>
            <span
              className={
                checkoutStep === "payment"
                  ? "profile-change-password cart-next-btn hidden"
                  : "profile-change-password cart-next-btn"
              }
              onClick={() => {
                if (checkoutStep === "cart") {
                  setCheckoutStep("order");
                } else {
                  setCheckoutStep("payment");
                }
              }}
            >
              Suivant
              <i className="fas fa-chevron-right next-btn-icon" />
            </span>
          </div>
          <section className="cart-section">
            {checkoutStep === "cart" ? (
              <div className="cart-container">
                {cart.length !== 0 ? (
                  cart.map((pens, index) => {
                    return (
                      <div className="cart-pen-container" key={uuidv4()}>
                        <div className="cart-pen-container-top">
                          <div id={"qty-form" + index} className="qty-input">
                            <label htmlFor="quantity">Quantité: </label>
                            <input
                              type="number"
                              name="quantity"
                              min="1"
                              max="10"
                              defaultValue={cart[index].quantity}
                              className="qty-input-value"
                              onBlur={() => {
                                setQuantity("quantity" + index, index);
                              }}
                              id={"quantity" + index}
                            />
                          </div>
                          <div className="cart-pen-delete">
                            <i
                              className="fas fa-times-circle"
                              onClick={async () => {
                                const newCart = await authContext.removeFromCart(
                                  pens.id
                                );
                                setCart(newCart);
                                setSubTotal(getSubTotal(newCart));
                              }}
                            ></i>
                          </div>
                        </div>
                        {pens.pen.map(item => {
                          return (
                            <div className="cart-pen-item" key={uuidv4()}>
                              <div className="cart-pen-img-and-name">
                                <img
                                  src={item.obj.path}
                                  className="cart-pen-img"
                                  key={uuidv4()}
                                />
                              </div>
                              <div>
                                {item.obj.name ? (
                                  <span
                                    className="cart-pen-item-name"
                                    key={uuidv4()}
                                  >
                                    {item.obj.name}
                                  </span>
                                ) : (
                                  <span
                                    className="cart-pen-item-name"
                                    key={uuidv4()}
                                  >
                                    {item.obj.type} {item.obj.color}
                                  </span>
                                )}
                              </div>
                              <span
                                className="cart-pen-item-price"
                                key={uuidv4()}
                              >
                                {formatter.format(item.obj.price)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })
                ) : (
                  <React.Fragment></React.Fragment>
                )}
              </div>
            ) : checkoutStep === "order" ? (
              <Order />
            ) : (
              <Payment
                emptyCart={props.emptyCart}
                resetCheckout={resetCheckout}
              />
            )}
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Cart;
